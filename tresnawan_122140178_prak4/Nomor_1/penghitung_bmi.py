def hitung_bmi():
    try:
        berat = float(input("Masukkan Berat Badan (KG) = "))
        tinggi = float(input("Masukkan Tinggi Badan (M) = "))
        
        if berat <= 0 or tinggi <= 0:
            print("Harus lebih dari 0 !!")
            return
        
        bmi = berat / (tinggi * tinggi)
        
        if bmi < 18.5:
            kategori = "Berat Badan Kurang"
        elif 18.5 <= bmi < 25:
            kategori = "Berat Badan Normal"
        elif 25 <= bmi < 30:
            kategori = "Berat Badan Berlebih"
        else:
            kategori = "Obesitas"
        
        print("\nHasil Perhitungan BMI:")
        print(f"BMI = {bmi:.2f}")
        print(f"Kategori = {kategori}")
        
    except ValueError:
        print("Error")

if __name__ == "__main__":
    print("Program Penghitung BMI (Body Mass Index)")
    hitung_bmi()