# Backend Programming Template (2025)

## Development Setup

1. Fork and clone this repository to your local computer.
2. Open the project using VS Code.
3. Install the recommended VS Code extensions: `ESLint` and `Prettier`.
4. Copy and rename `.env.example` to `.env`. Open `.env` and change the database connection string.
5. Run `npm install` to install the project dependencies.
6. Run `npm run dev` to start the dev server.
7. Test the endpoints in the API client app.

## Add New API Endpoints

1. Create a new database schema in `./src/models`.
2. Create a new folder in `./src/api/components` (if needed). Remember to separate your codes to repositories, services, controllers, and routes.
3. Add the new route in `./src/api/routes.js`.
4. Test your new endpoints in the API client app.

## Dokumentasi API Gacha (Kuis)

## POST `/api/gacha`

1. Fungsi: undian gacha (maksimal 5x sehari)
1. Request Body (JSON): `{"user_id": "string_id_user"}`

## GET `/api/gacha/history`

1. Fungsi: Melihat riwayat gacha user
2. Query Params / Body: `user_id=string_id_user`

## GET `/api/gacha/prizes`

1. Fungsi: Menampilkan daftar hadiah dan sisa kuota
2. Parameter: Tidak perlu input

## GET `/api/gacha/winners`

1. Fungsi: Menampilkan daftar pemenang dengan nama disensor secara acak
2. Parameter: Tidak perlu input

## CATATAN

Sebelum mencoba, pastikan di database collection `prizes` diisi hadiah terlebih dahulu secara manual dengan data awal agar undian tidak zonk terus terusan.

## Catatan untuk Pak Janson

koneksi saya tidak bisa jika tidak di bypass di folder `models` --> `index.js` pada line 9-11. karena koneksi dirumah saya memakai koneksi indihome. lalu di SRV Connection String saya tidak di aktifkan.
