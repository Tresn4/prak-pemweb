PI = 3.14159

def luas_persegi(sisi):
    """menghitung luas persegi"""
    return sisi * sisi

def keliling_persegi(sisi):
    """menghitung keliling persegi"""
    return 4 * sisi

def luas_persegi_panjang(panjang, lebar):
    """menghitung luas persegi panjang"""
    return panjang * lebar

def keliling_persegi_panjang(panjang, lebar):
    """menghitung keliling persegi panjang"""
    return 2 * (panjang + lebar)

def luas_lingkaran(jari_jari):
    """menghitung luas lingkaran"""
    return PI * jari_jari * jari_jari

def keliling_lingkaran(jari_jari):
    """menghitung keliling lingkaran"""
    return 2 * PI * jari_jari

def celsius_ke_fahrenheit(celsius):
    """konversi suhu dari Celsius ke Fahrenheit"""
    return (celsius * 9/5) + 32

def celsius_ke_kelvin(celsius):
    """konversi suhu dari Celsius ke Kelvin"""
    return celsius + 273.15

def fahrenheit_ke_celsius(fahrenheit):
    """konversi suhu dari Fahrenheit ke Celsius"""
    return (fahrenheit - 32) * 5/9

def kelvin_ke_celsius(kelvin):
    """konversi suhu dari Kelvin ke Celsius"""
    return kelvin - 273.15