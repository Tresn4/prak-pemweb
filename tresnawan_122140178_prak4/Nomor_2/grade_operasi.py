def kelola_data_mahasiswa():
    mahasiswa = [
        {"Nama": "Abraham", "NIM": "12914001", "nilai_uts": 45, "nilai_uas": 65, "nilai_tugas": 90},
        {"Nama": "Imad", "NIM": "12614400", "nilai_uts": 53, "nilai_uas": 20, "nilai_tugas": 45},
        {"Nama": "Yasir", "NIM": "12014069", "nilai_uts": 15, "nilai_uas": 100, "nilai_tugas": 86},
        {"Nama": "Sontang", "NIM": "11814911", "nilai_uts": 99, "nilai_uas": 90, "nilai_tugas": 19},
        {"Nama": "Aziz", "NIM": "12414321", "nilai_uts": 60, "nilai_uas": 80, "nilai_tugas": 65}
    ]
    
    for mhs in mahasiswa:
        nilai_akhir = 0.2 * mhs["nilai_uts"] + 0.4 * mhs["nilai_uas"] + 0.3 * mhs["nilai_tugas"]
        mhs["nilai_akhir"] = round(nilai_akhir, 2)
        
        if nilai_akhir >= 80:
            mhs["grade"] = "A"
        elif nilai_akhir >= 70:
            mhs["grade"] = "B"
        elif nilai_akhir >= 60:
            mhs["grade"] = "C"
        elif nilai_akhir >= 50:
            mhs["grade"] = "D"
        else:
            mhs["grade"] = "E"
    
    print("\nData Mahasiswa:")
    print("=" * 80)
    print("{:<15} {:<10} {:<10} {:<10} {:<10} {:<15} {:<5}".format(
        "Nama", "NIM", "UTS", "UAS", "Tugas", "Nilai Akhir", "Grade"))
    print("-" * 80)
    
    for mhs in mahasiswa:
        print("{:<15} {:<10} {:<10} {:<10} {:<10} {:<15} {:<5}".format(
            mhs["Nama"], mhs["NIM"], mhs["nilai_uts"], mhs["nilai_uas"], 
            mhs["nilai_tugas"], mhs["nilai_akhir"], mhs["grade"]))
    
    print("-" * 80)
    
    nilai_tertinggi = max(mahasiswa, key=lambda x: x["nilai_akhir"])
    nilai_terendah = min(mahasiswa, key=lambda x: x["nilai_akhir"])
    
    print(f"\nNilai tertinggi: {nilai_tertinggi['Nama']} (Nilai: {nilai_tertinggi['nilai_akhir']}, Grade: {nilai_tertinggi['grade']})")
    print(f"Nilai terendah: {nilai_terendah['Nama']} (Nilai: {nilai_terendah['nilai_akhir']}, Grade: {nilai_terendah['grade']})")

if __name__ == "__main__":
    print("Program Pengelolaan Data Nilai Akhir Mahasiswa")
    kelola_data_mahasiswa()