# Dokumentasi API Marketplace Sneakers Edisi Terbatas

User :
1. Sneaker (UserId)
2. Auction 2 (WinnerId dan UserId)
3. Bid (UserId)
4. Preorder (UserId)
5. Preorder Transaction (UserId)
6. UserRating 2 (RatedUserId dan ReviewerId)

Sneaker : 
1. Auction (SneakerId)
2. belongsTo (models.user { fk: "UserId"}

Auction : 
1. Bid (AuctionId)
2. UserRating (AuctionId)
3. belongsTo (models.Sneaker, { fk: "SneakerId }
4. belongsTo (models.User, { fk: "UserId" }
5. belongsTo (models.User, { fk: "WinnerId" }

Bid : 
1. belongsTo (models.Auction, { fk: "AuctionId" }
2. belongsTo (models.User, { fk: "UserId" }

Preorder : 
1. Preorder Transaction (PreOrderId)
2. belongsTo (models.User, { fk : "UserId" }

PreorderTransaction : 
1. UserRating (PreorderTransactionId)
2. belongsTo (models.PreOrder, { fk :"PreOrderId" }
3. belongsTo (models.User, { fk : "UserId" }

UserRating : 
1. belongsTo (models.User, { fk : "RatedUserId" }
2. belongsTo (models.User, { fk : "ReviewerId" }
3. belongsTo (models.Auction, { fk : "AuctionId" }
4. belongsTo (models.PreorderTransaction, { fk : "PreorderTransactionId" }

## Model

### Model User

- email : string, unik (wajib)
- password : string (wajib)
- role : string (opsional, default: 'pembeli', enum: ['pembeli', 'penjual', 'admin'])
- isVerifiedReseller : boolean (default: false)
- resellerVerificationStatus : string (opsional, enum: ['menunggu', 'disetujui', 'ditolak'])

### Model Sneaker

- name : string (wajib)
- price : integer (wajib)
- brand : string (wajib) // contoh: "Nike", "Adidas", "Jordan", "Yeezy"
- releaseYear : integer (wajib)
- size : string (wajib) // ukuran US
- condition : string (wajib) // contoh: "DS" (Deadstock), "VNDS" (Very Near Deadstock), "Bekas"
- colorway : string (wajib) // contoh: "Bred", "Chicago", "Panda"
- collaboration : string // contoh: "Travis Scott", "Off-White", null untuk non-kolaborasi
- imageUrl : string (wajib)
- box : string (wajib) // contoh: "Kotak Asli", "Kotak Pengganti", "Tanpa Kotak"
- UserId : integer (wajib)
- authenticityStatus : string (opsional, enum: ['menunggu', 'terverifikasi', 'ditolak'])

### Model Auction

- sneakerId : integer (wajib, foreign key ke Sneaker)
- startingPrice : integer (wajib)
- currentPrice : integer (default 0)
- reservePrice : integer // opsional, harga minimum untuk dijual
- minBidIncrement : integer (wajib)
- startTime : datetime (wajib)
- endTime : datetime (wajib)
- allowAutoBid : boolean (default false)
- buyNowPrice : integer // opsional
- status : string (wajib, enum: ['terjadwal', 'aktif', 'berakhir', 'terjual', 'dibatalkan'])
- winnerId : integer (opsional, foreign key ke User yang memenangkan lelang)
- UserId : integer (wajib, foreign key ke User yang membuat lelang)
- totalBids : integer (default 0)

### Model Bid

- auctionId : integer (wajib, foreign key ke Lelang)
- UserId : integer (wajib, foreign key ke User yang memasang bid)
- amount : integer (wajib)
- autoBidLimit : integer // opsional, untuk bid otomatis
- timestamp : datetime (wajib)
- isHighestBid : boolean (default false)
- status : string (opsional, enum: ['active', 'cancelled', 'pending'])

### Model Preorder

- name : string (wajib)
- brand : string (wajib)
- releaseDate : date (wajib)
- expectedDeliveryDate : date (wajib)
- price : integer (wajib)
- retailPrice : integer (wajib)
- description : text
- imageUrl : string
- retailStore : string
- guaranteed : boolean (default false)
- refundPolicy : text
- status : string (wajib, enum: ['terbuka', 'terjamin', 'diproses', 'dikirim', 'terkirim', 'dibatalkan'])
- UserId : integer (wajib, foreign key ke User yang membuat preorder)
- totalSlots : integer (wajib)
- remainingSlots : integer (wajib)

### Model PreorderTransaction

- preorderId : integer (wajib, foreign key ke Preorder)
- UserId : integer (wajib, foreign key ke User yang melakukan transaksi)
- size : string (wajib) // ukuran US
- quantity : integer (wajib)
- totalPrice : integer (wajib)
- status : string (wajib, enum: ['menunggu', 'terjamin', 'diproses', 'dikirim', 'terkirim', 'dibatalkan'])
- trackingNumber : string // opsional

### Model UserRating

- ratedUserId : integer (wajib, foreign key ke User yang diberi rating)
- reviewerId : integer (wajib, foreign key ke User yang memberi rating)
- rating : integer (wajib, 1-5)
- comment : text
- typeTransaction : string (wajib, ["Auction", "Preorder"])
- auctionId: integer (opsional, foreign key ke Lelang)
- preorderTransactionId: integer (opsional, foreign key ke PreorderTransaction)

## Endpoint

### Endpoint Otentikasi

- `POST /register`
- `POST /login`

### Endpoint Sneaker (Terotentikasi)

- `GET /sneakers`
- `POST /sneakers`
- `GET /sneakers/filter`
- `GET /brands`
- `GET /sneakers/popular`
- `GET /sneakers/upcoming-releases`
- `POST /sneakers/:id/legit-check-images`

### Endpoint Manajemen Sneaker (Terotentikasi)

- `PUT /sneakers/:id`
- `DELETE /sneakers/:id`

### Endpoint Lelang (Terotentikasi)

- `POST /auctions`
- `GET /auctions`
- `GET /auctions/:id`
- `POST /auctions/:id/bid`
- `GET /auctions/:id/bids`

### Endpoint Preorder (Terotentikasi)

- `POST /preorders`
- `GET /preorders`
- `GET /preorders/:id`
- `PATCH /preorders/:id/status`
- `GET /user/preorders`

### Endpoint Verifikasi dan Rating User

- `POST /authenticity-check`
- `PATCH /user/verify-reseller`
- `GET /user/ratings`
- `POST /user/:id/rating`

## Detail Endpoint

### 1. POST /register

#### Body Request

```json
{
  "email": "string",
  "password": "string"
}
```

#### Responses

- 201: User berhasil dibuat
- 400: Error validasi (email wajib, format tidak valid, dll)

### 2. POST /login

#### Body Request

```json
{
  "email": "string",
  "password": "string"
}
```

#### Responses

- 200: Login sukses, mengembalikan access token
- 400: Email/password tidak ada
- 401: Kredensial tidak valid

### 3. GET /sneakers

#### Query Parameters

- `page` : integer (wajib)
- `limit` : integer (wajib)
- `brand` : string (opsional)
- `releaseYear` : integer (opsional)
- `size` : string (opsional)
- `condition` : string (opsional)

#### Responses

- 200: Mengembalikan daftar sneaker berdasarkan filter, dalam format:

```json
{
  "totalItems": "integer",
  "sneakers": [
    {
      "id": "integer",
      "name": "string",
      "price": "integer",
      "brand": "string",
      ...
    },
    ...
  ]
}
```

### 4. POST /sneakers

#### Headers

- `Authorization` : Bearer token (wajib)

#### Body Request

```json
{
  "name": "string",
  "price": "integer",
  "brand": "string",
  "releaseYear": "integer",
  "size": "string",
  "condition": "string",
  "colorway": "string",
  "collaboration": "string|null",
  "imageUrl": "string",
  "box": "string"
}
```

#### Responses

- 201: Sneaker berhasil dibuat, mengembalikan data sneaker
- 400: Error validasi (field wajib, format tidak valid, dll)
- 401: Unauthorized (token tidak valid)

### 5. PUT /sneakers/:id

#### Headers

- `Authorization` : Bearer token (wajib)

#### Body Request

```json
{
  "name": "string",
  "price": "integer",
  "size": "string",
  "condition": "string",
  ...
}
```

#### Responses

- 200: Sneaker berhasil diperbarui, mengembalikan data sneaker terbaru
- 400: Error validasi
- 401: Unauthorized (token tidak valid)
- 403: Forbidden (bukan pemilik sneaker)
- 404: Sneaker tidak ditemukan

### 6. DELETE /sneakers/:id

#### Headers

- `Authorization` : Bearer token (wajib)

#### Responses

- 200: Sneaker berhasil dihapus
- 401: Unauthorized (token tidak valid)
- 403: Forbidden (bukan pemilik sneaker)
- 404: Sneaker tidak ditemukan

### 7. POST /auctions

#### Headers

- `Authorization` : Bearer token (wajib)

#### Body Request

```json
{
  "sneakerId": "integer",
  "startingPrice": "integer",
  "reservePrice": "integer|null",
  "minBidIncrement": "integer",
  "startTime": "datetime",
  "endTime": "datetime",
  "allowAutoBid": "boolean",
  "buyNowPrice": "integer|null"
}
```

#### Responses

- 201: Lelang berhasil dibuat, mengembalikan data lelang
- 400: Error validasi
- 401: Unauthorized (token tidak valid)
- 403: Forbidden (bukan pemilik sneaker)
- 404: Sneaker tidak ditemukan

### 8. GET /auctions

#### Query Parameters

- `page` : integer (wajib)
- `limit` : integer (wajib)
- `status` : string (opsional, enum: ['scheduled', 'active', 'ended', 'sold', 'cancelled'])

#### Responses

- 200: Mengembalikan daftar lelang, dalam format:

```json
{
  "totalItems": "integer",
  "auctions": [
    {
      "id": "integer",
      "sneakerId": "integer",
      "sneakerName": "string",
      "startingPrice": "integer",
      "currentPrice": "integer",
      "status": "string",
      ...
    },
    ...
  ]
}
```

### 9. GET /auctions/:id

#### Responses

- 200: Mengembalikan detail lelang
- 404: Lelang tidak ditemukan

### 10. POST /auctions/:id/bid

#### Headers

- `Authorization` : Bearer token (wajib)

#### Body Request

```json
{
  "amount": "integer",
  "autoBidLimit": "integer|null"
}
```

#### Responses

- 200: Bid berhasil ditempatkan, mengembalikan data bid terbaru
- 400: Error validasi (jumlah bid kurang dari harga saat ini, dll)
- 401: Unauthorized (token tidak valid)
- 403: Forbidden (pemilik lelang tidak dapat melakukan bid)
- 404: Lelang tidak ditemukan
- 422: Lelang sudah berakhir/dibatalkan

### 11. POST /preorders

#### Headers

- `Authorization` : Bearer token (wajib)

#### Body Request

```json
{
  "name": "string",
  "brand": "string",
  "releaseDate": "date",
  "expectedDeliveryDate": "date",
  "price": "integer",
  "retailPrice": "integer",
  "description": "text|null",
  "imageUrl": "string|null",
  "retailStore": "string|null",
  "guaranteed": "boolean",
  "refundPolicy": "text|null",
  "totalSlots": "integer",
  "sizes": [
    {
      "size": "string",
      "quantity": "integer",
      "price": "integer"
    },
    ...
  ]
}
```

#### Responses

- 201: Preorder berhasil dibuat, mengembalikan data preorder
- 400: Error validasi
- 401: Unauthorized (token tidak valid)

### 12. PATCH /preorders/:id/status

#### Headers

- `Authorization` : Bearer token (wajib)

#### Body Request

```json
{
  "status": "string" // enum: ['open', 'secured', 'processing', 'shipping', 'delivered', 'cancelled']
}
```

#### Responses

- 200: Status preorder berhasil diperbarui
- 400: Status tidak valid
- 401: Unauthorized (token tidak valid)
- 403: Forbidden (bukan pemilik preorder)
- 404: Preorder tidak ditemukan

### 13. GET /user/preorders

#### Headers

- `Authorization` : Bearer token (wajib)

#### Responses

- 200: Mengembalikan daftar transaksi preorder user, dalam format:

```json
[
  {
    "id": "integer",
    "preorderId": "integer",
    "size": "string",
    "quantity": "integer",
    "totalPrice": "integer",
    "status": "string",
    ...
  },
  ...
]
```

- 401: Unauthorized (token tidak valid)

## Global Error Responses

- 401: Unauthorized (token tidak valid)
- 500: Internal Server Error

## Catatan

- Semua tanggal dalam format ISO 8601
- Harga dalam unit mata uang terkecil (contoh: IDR)
- Ukuran mengacu pada sistem ukuran sepatu US
