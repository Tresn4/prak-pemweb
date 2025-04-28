from math_operations import *
import math_operations as mo

def main():
    print("Program Demonstrasi Modul Matematika")
    
    print("\nPerhitungan Geometri")
    print("-" * 50)
    
    sisi_persegi = 5
    print(f"Persegi dengan sisi {sisi_persegi}")
    print(f"Luas: {luas_persegi(sisi_persegi)}")
    print(f"Keliling: {keliling_persegi(sisi_persegi)}")
    
    panjang = 8
    lebar = 4
    print(f"\nPersegi Panjang dengan panjang {panjang} dan lebar {lebar}")
    print(f"Luas: {luas_persegi_panjang(panjang, lebar)}")
    print(f"Keliling: {keliling_persegi_panjang(panjang, lebar)}")
    
    jari_jari = 7
    print(f"\nLingkaran dengan jari-jari {jari_jari}")
    print(f"Luas: {luas_lingkaran(jari_jari):.2f}")
    print(f"Keliling: {keliling_lingkaran(jari_jari):.2f}")
    
    print("\n2. Konversi Suhu (menggunakan import dengan alias):")
    print("-" * 50)
    
    suhu_celsius = 25
    print(f"Suhu {suhu_celsius}°C = {mo.celsius_ke_fahrenheit(suhu_celsius):.2f}°F")
    print(f"Suhu {suhu_celsius}°C = {mo.celsius_ke_kelvin(suhu_celsius):.2f}K")
    
    suhu_fahrenheit = 98.6
    print(f"Suhu {suhu_fahrenheit}°F = {mo.fahrenheit_ke_celsius(suhu_fahrenheit):.2f}°C")
    
    suhu_kelvin = 300
    print(f"Suhu {suhu_kelvin}K = {mo.kelvin_ke_celsius(suhu_kelvin):.2f}°C")
    
    print(f"\nNilai konstanta PI: {mo.PI}")

if __name__ == "__main__":
    main()