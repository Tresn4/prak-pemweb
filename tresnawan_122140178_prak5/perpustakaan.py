from abc import ABC, abstractmethod
from datetime import datetime

class LibraryItem(ABC):
    def __init__(self, item_id, title, year_published):
        self._item_id = item_id
        self._title = title
        self._year_published = year_published
        self._is_available = True
        self._borrowed_date = None
        self._borrower = None

    @property
    def item_id(self):
        return self._item_id

    @property
    def title(self):
        return self._title

    @property
    def is_available(self):
        return self._is_available

    def borrow(self, borrower):
        if self._is_available:
            self._is_available = False
            self._borrowed_date = datetime.now()
            self._borrower = borrower
            return True
        return False

    def return_item(self):
        if not self._is_available:
            self._is_available = True
            self._borrowed_date = None
            self._borrower = None
            return True
        return False

    def get_info(self):
        status = "Tersedia" if self._is_available else f"Dipinjam oleh {self._borrower}"
        return f"ID: {self._item_id}, Judul: {self._title}, Tahun: {self._year_published}, Status: {status}"

    @abstractmethod
    def get_details(self):
        pass


class Book(LibraryItem):
    def __init__(self, item_id, title, year_published, author, pages, publisher):
        super().__init__(item_id, title, year_published)
        self._author = author
        self._pages = pages
        self._publisher = publisher

    @property
    def author(self):
        return self._author

    def get_details(self):
        basic_info = self.get_info()
        return f"{basic_info}, Penulis: {self._author}, Halaman: {self._pages}, Penerbit: {self._publisher}"


class Magazine(LibraryItem):
    def __init__(self, item_id, title, year_published, issue_number, publisher):
        super().__init__(item_id, title, year_published)
        self._issue_number = issue_number
        self._publisher = publisher

    @property
    def issue_number(self):
        return self._issue_number

    def get_details(self):
        basic_info = self.get_info()
        return f"{basic_info}, Nomor Edisi: {self._issue_number}, Penerbit: {self._publisher}"


class Library:
    def __init__(self, name):
        self._name = name
        self.__items = {}
        self.__last_id = 0

    @property
    def name(self):
        return self._name

    @property
    def item_count(self):
        return len(self.__items)

    def add_item(self, item):
        if isinstance(item, LibraryItem):
            self.__items[item.item_id] = item
            return True
        return False

    def generate_id(self, prefix):
        self.__last_id += 1
        return f"{prefix}{self.__last_id:04d}"

    def display_all_items(self):
        if not self.__items:
            return ["Perpustakaan kosong."]
    
        item_list = []
        for item in self.__items.values():
            item_list.append(item.get_details())
        return item_list
    
    def search_by_id(self, item_id):
        return self.__items.get(item_id)

    def search_by_title(self, title):
        results = []
        for item in self.__items.values():
            if title.lower() in item.title.lower():
                results.append(item)
        return results

def main():
    perpustakaan = Library("Perpustakaan Sederhana")
    
    buku1 = Book("BK666", "1001 Cara jadi Kaya", 1998, "Ucok Korek", 450, "Erlangga")
    buku2 = Book("BK911", "Cara menjinakkan ular Phyton", 1576, "Hansip Codet", 380, "Gramedia")
    
    majalah1 = Magazine("MG69", "Berita HOT Terkini", 2022, "Edisi 45", "Reclas Tech")
    majalah2 = Magazine("MG00", "Programming Gampang", 2023, "Edisi 12", "Dicoding")
    
    perpustakaan.add_item(buku1)
    perpustakaan.add_item(buku2)
    perpustakaan.add_item(majalah1)
    perpustakaan.add_item(majalah2)
    
    print(f"Selamat datang di {perpustakaan.name}")
    print(f"Jumlah item saat ini: {perpustakaan.item_count}")
    
    print("\nDaftar semua item:")
    for item_info in perpustakaan.display_all_items():
        print(item_info)
    
    print("\nHasil pencarian dengan kata kunci 'Kaya':")
    search_results = perpustakaan.search_by_title("Kaya")
    for item in search_results:
        print(item.get_details())
    
    print("\nMeminjam buku '1001 Cara jadi Kaya':")
    if buku1.borrow("Lamine Yamal"):
        print("Buku berhasil dipinjam")
    
    print("\nStatus buku setelah dipinjam:")
    print(buku1.get_details())
    
    print("\nMengembalikan buku '1001 Cara jadi Kaya':")
    if buku1.return_item():
        print("Buku berhasil dikembalikan")
    
    print("\nStatus buku setelah dikembalikan:")
    print(buku1.get_details())


if __name__ == "__main__":
    main()