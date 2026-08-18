# CatchProof Kodunu Yazmadan Önce Nasıl Düşünülür

Kod dosyasında `Catch` en üstte ama zihinsel olarak oraya en son varırsın. Kod yazma sırası ile **düşünme sırası** farklı şeylerdir. İşte bir geliştiricinin kafasında muhtemelen izleyeceği mantık sırası:

## 1. Önce "kim kiminle ilişkili" sorusunu sor

Kod yazmadan önce kağıda şunu çiz: _Kimler var, birbirleriyle nasıl bağlantılılar?_

- Kullanıcı var
- Kullanıcı grup kurabiliyor/katılabiliyor → **Kullanıcı ↔ Grup** ilişkisi (çoka-çok)
- Kullanıcı balık kaydı oluşturabiliyor → **Kullanıcı → Kayıt** (bire-çok, kaydın tek sahibi var)
- Kayıt gruplarla paylaşılabiliyor → **Kayıt ↔ Grup** ilişkisi (çoka-çok)

Bu üç ilişkiyi çıkarınca, otomatik olarak üç varlığın (entity) olması gerektiği ortaya çıkıyor: **User, Group, Catch**.

## 2. En "bağımlı" olanı, yani en basit olanı önce tanımla

`Catch`'in var olması için ne gerekiyor? Sadece bir sahibi (owner) ve tür bilgisi. Başka hiçbir sınıfa ihtiyacı yok — kendi başına ayakta durabilir. O yüzden zihinde önce onu netleştirirsin: "bir kayıt neye sahip olmalı?" (tür, boy, not, doğrulanmış mı, hangi gruplara paylaşıldı).

## 3. Sonra "kayıtları tutan kap" olan Group'u düşün

Group'un kendi başına pek bir şey yapmadığını fark edersin — sadece bir isim, üye listesi, kayıt listesi. Asıl işi (katılma/ayrılma) aslında User yapacak, Group sadece veriyi tutan bir kutu.

## 4. En son, en çok iş yapan User'a gel

Burada zihinsel sıralama önemli — **her metod bir öncekinin üzerine inşa edilir:**

1. Önce en temel eylem: _"bir grup kurmak" nedir?_ → yeni Group yarat + kendini otomatik üye yap (`createGroup` içinde `joinGroup`'u kullanacağını fark edersin, o yüzden önce `joinGroup`'u tanımlaman gerekir)
2. _"gruba katılmak" nedir?_ → iki listeye birden ekleme (çift yönlü bağlantı fikri burada oturur)
3. _"gruptan ayrılmak" nedir?_ → katılmanın tersi... ama sonra "ya benim o gruba paylaştığım kayıtlar ne olacak?" sorusu aklına gelir — işte bu, deneyimden gelen bir detay, ilk seferde akla gelmeyebilir
4. _"kayıt oluşturmak" nedir?_ → burada "peki bu kayıt hangi gruplarla paylaşılsın, yoksa özel mi kalsın?" sorusu seni `visibility` kavramına götürür
5. _"kaydı silmek" nedir?_ → oluşturmanın tersi, aynı bağlantıları söküyorsun
6. _"hesabı silmek" nedir?_ → en son akla gelir çünkü aslında yeni bir şey değil, önceki iki işlemin (ayrılma + silme) hepsine birden uygulanması

## Özetle zihinsel akış

```
İlişkileri çiz (kim kime bağlı?)
   ↓
En bağımsız varlığı tanımla (Catch)
   ↓
Onu tutan kabı tanımla (Group)
   ↓
Aksiyonları "kur/katıl/ayrıl/oluştur/sil" sırasıyla düşün (User)
      her adımda "bunun tersi ne olurdu, ne bozulur?" diye sor
   ↓
En sona "hepsini birden yap" gibi bileşik eylemleri koy (deleteAccount)
```

Yani kural şu: **önce varlıkları (noun'ları), sonra eylemleri (verb'leri) düşün; eylemleri de basitten bileşiğe doğru sırala.** Kod dosyasındaki sıralama (Catch → Group → User) aslında "en az bağımlı olandan en çok bağımlı olana" mantığını takip ediyor, ama User'ı yazarken zihinsel olarak "bir kullanıcı ne yapabilir" listesini çıkarıp onu adım adım genişletiyorsun.
