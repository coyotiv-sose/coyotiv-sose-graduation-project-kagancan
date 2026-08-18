console.log('CatchProof is a social network for verified fish catches!')

// ============================================
// EGZERSİZ 1: Catch sınıfı
// ============================================
// Bir balık kaydını temsil eden Catch sınıfını yaz.
//
// - groups        -> başlangıçta boş dizi (bu kaydın paylaşıldığı gruplar)
// - verified       -> başlangıçta false
// - constructor(owner, species, options) ->
//     options içinde:
//       size       -> varsayılan null
//       note       -> varsayılan ''
//       visibility -> varsayılan 'group'
//     ayrıca createdAt -> şu anki tarih (new Date())
// - verify()       -> verified'i true yapar
// - edit(updates)  -> verilen güncellemeleri nesneye uygular
//                     (ipucu: Object.assign kullanabilirsin)

class Catch {
  // buraya yaz
}

// ============================================
// EGZERSİZ 2: Group sınıfı
// ============================================
// Bir grubu temsil eden Group sınıfını yaz.
//
// - members        -> başlangıçta boş dizi
// - catches        -> başlangıçta boş dizi (bu gruba paylaşılan kayıtlar)
// - constructor(name) -> grubun adını kaydeder
// - addMember(user)    -> işi User'a devreder: user.joinGroup(this)
// - removeMember(user) -> işi User'a devreder: user.leaveGroup(this)
// - edit(updates)      -> Object.assign ile grup bilgisini günceller
//
// Not: joinGroup ve leaveGroup metodlarını az sonra User sınıfında yazacaksın,
// o yüzden şimdilik sadece çağırdığını yaz, henüz çalışmasa da olur.

class Group {
  // buraya yaz
}

// ============================================
// EGZERSİZ 3: User sınıfı - temel alanlar ve createGroup
// ============================================
// - groups  -> başlangıçta boş dizi (üye olduğu / kurduğu gruplar)
// - catches -> başlangıçta boş dizi (kendi balık kayıtları)
// - constructor(name) -> kullanıcının adını kaydeder
// - createGroup(name) ->
//     1. yeni bir Group oluşturur
//     2. this.joinGroup(group) çağırarak kendisini otomatik üye yapar
//     3. oluşturduğu grubu return eder

class User {
  // buraya yaz (createGroup ile başla, sıradaki egzersizlerde devam edeceğiz)
  // ============================================
  // EGZERSİZ 4: joinGroup
  // ============================================
  // joinGroup(group) ->
  //   - group.members dizisine this (kullanıcının kendisi) eklenir
  //   - this.groups dizisine group eklenir
  //   (yani bağlantı iki yönlü kurulmalı: hem grup kullanıcıyı, hem kullanıcı grubu bilmeli)
  // ============================================
  // EGZERSİZ 5: leaveGroup
  // ============================================
  // leaveGroup(group) ->
  //   1. group.members listesinden this'i çıkar (filter kullan)
  //   2. this.groups listesinden group'u çıkar (filter kullan)
  //   3. EK OLARAK: bu kullanıcının paylaştığı kayıtların (this.catches),
  //      bu grupla olan bağlantısını da kopar:
  //      - her catch için, catch.groups listesinden bu group'u çıkar
  //      - group.catches listesinden de sahibi (owner) this olan kayıtları çıkar
  //   İpucu: kayıt SİLİNMİYOR, sadece bu grupla ilişkisi kesiliyor.
  // ============================================
  // EGZERSİZ 6: recordCatch
  // ============================================
  // recordCatch(species, options) ->
  //   options içinde: size, note, groups (varsayılan boş dizi), visibility (varsayılan 'group')
  //   1. yeni bir Catch oluştur (owner olarak this'i ver)
  //   2. eğer visibility === 'group' ise:
  //      - verilen her group için:
  //        - group.catches dizisine catchRecord'u ekle
  //        - catchRecord.groups dizisine group'u ekle
  //   3. this.catches dizisine catchRecord'u ekle
  //   4. catchRecord'u return et
  // ============================================
  // EGZERSİZ 7: deleteCatch
  // ============================================
  // deleteCatch(catchRecord) ->
  //   1. this.catches listesinden catchRecord'u çıkar (filter)
  //   2. catchRecord.groups içindeki her group için,
  //      group.catches listesinden de catchRecord'u çıkar (filter)
  // ============================================
  // EGZERSİZ 8: deleteAccount
  // ============================================
  // deleteAccount() ->
  //   1. this.groups içindeki her grup için this.leaveGroup(group) çağır
  //      (İPUCU: forEach sırasında this.groups'un kendisini değiştiriyoruz,
  //       bu yüzden orijinal diziyi kopyalayarak döngüye gir: [...this.groups])
  //   2. this.catches içindeki her kayıt için this.deleteCatch(c) çağır
  //      (aynı ipucu burada da geçerli: [...this.catches])
  // ============================================
  // EGZERSİZ 9: editProfile
  // ============================================
  // editProfile(updates) -> Object.assign ile kullanıcı bilgisini günceller
}

// ============================================
// EGZERSİZ 10: Demo / smoke test
// ============================================
// Yukarıdaki sınıfları kullanarak aşağıdaki senaryoyu KENDİN yaz:
//
// 1. İki kullanıcı oluştur: kagan, derya
// 2. Kagan 'Trabzon Anglers' adında bir grup kursun
// 3. Derya 'Black Sea Coast' adında bir grup kursun
// 4. Kagan, Derya'nın grubuna katılsın
// 5. Derya, Kagan'ın grubuna katılsın
// 6. console.log ile her ikisinin kaç gruba üye olduğunu yazdır
// 7. Kagan bir 'Anchovy' kaydı oluştursun, boyu 12, hem kendi hem Derya'nın grubuna paylaşsın
// 8. Derya bir 'Bonito' kaydı oluştursun, boyu 34, sadece kendi grubuna paylaşsın
// 9. Derya bir 'Sea Bass' kaydı oluştursun, visibility 'private' olsun
// 10. console.log ile:
//     - Trabzon grubunun kaç paylaşılan kaydı olduğunu (1 olmalı)
//     - Black Sea grubunun kaç paylaşılan kaydı olduğunu (2 olmalı)
//     - Sea Bass kaydının hiç gruba bağlı olmadığını (groups.length === 0)
// 11. Anchovy kaydını verify() ile doğrula, sonucu console.log ile kontrol et
// 12. Bonito kaydını edit() ile size: 36 yap, sonucu kontrol et
// 13. Kagan, Black Sea grubundan ayrılsın (leaveGroup)
//     - üye sayısını kontrol et
//     - Anchovy'nin artık Black Sea grubuna bağlı OLMADIĞINI kontrol et
//     - Anchovy'nin hâlâ Trabzon grubuna bağlı OLDUĞUNU kontrol et
// 14. Derya, Bonito kaydını silsin (deleteCatch)
//     - Black Sea grubunda artık Bonito olmadığını kontrol et
// 15. Derya hesabını silsin (deleteAccount)
//     - grup sayısının 0 olduğunu kontrol et
//     - kayıt sayısının 0 olduğunu kontrol et
//     - Trabzon grubunda artık Derya'nın üye olmadığını kontrol et

// buraya yaz
