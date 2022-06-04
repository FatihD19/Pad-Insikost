-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 04, 2022 at 09:27 AM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 7.4.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `kos_pad2`
--

-- --------------------------------------------------------

--
-- Table structure for table `complaints`
--

CREATE TABLE `complaints` (
  `id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `photo_url` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `content` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `complaints`
--

INSERT INTO `complaints` (`id`, `user_id`, `photo_url`, `content`, `created_at`, `updated_at`) VALUES
('fe38b9ab-47a8-42cb-b849-a906952e8372', 'dd864091-1f79-45fa-b75b-50b7c15efd52', 'https://penghuni.jpg', 'Wifi nya mati nih..', '2022-04-08 07:38:13', '2022-04-08 07:38:13');

-- --------------------------------------------------------

--
-- Table structure for table `facilities`
--

CREATE TABLE `facilities` (
  `id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `facilities`
--

INSERT INTO `facilities` (`id`, `name`, `created_at`, `updated_at`) VALUES
('17613cf3-2bba-4b52-947f-22147e7ed118', 'Wifi', '2022-01-14 10:35:32', '2022-01-14 10:35:32'),
('9347ae8a-1651-4dae-a2d1-532fc5f48a2b', 'kasur dan bantal', '2022-01-26 07:19:55', '2022-01-26 07:20:16'),
('949429f7-6b7c-4fcc-8e60-bd035b557641', 'pc gaminh', '2022-04-08 07:46:29', '2022-04-08 07:46:29'),
('ee85da89-92c8-4a46-a2c0-1a7477fca20f', 'Wifi', '2022-04-08 07:38:13', '2022-04-08 07:38:13');

-- --------------------------------------------------------

--
-- Table structure for table `facility_room`
--

CREATE TABLE `facility_room` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `facility_id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `room_id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `facility_room`
--

INSERT INTO `facility_room` (`id`, `facility_id`, `room_id`, `created_at`, `updated_at`) VALUES
(22, '17613cf3-2bba-4b52-947f-22147e7ed118', '831451a2-4334-44a4-8fb8-9de12ead169d', NULL, NULL),
(28, 'ee85da89-92c8-4a46-a2c0-1a7477fca20f', 'a3b8ebf7-cba1-47c4-a166-51311741a5a1', '2022-04-08 07:38:13', '2022-04-08 07:38:13'),
(29, '17613cf3-2bba-4b52-947f-22147e7ed118', 'adbe42ce-f8fc-4b10-8db1-03417375a0b7', NULL, NULL),
(30, '9347ae8a-1651-4dae-a2d1-532fc5f48a2b', 'adbe42ce-f8fc-4b10-8db1-03417375a0b7', NULL, NULL),
(31, '949429f7-6b7c-4fcc-8e60-bd035b557641', 'adbe42ce-f8fc-4b10-8db1-03417375a0b7', NULL, NULL),
(32, 'ee85da89-92c8-4a46-a2c0-1a7477fca20f', 'adbe42ce-f8fc-4b10-8db1-03417375a0b7', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2019_09_26_134428_create_users_table', 1),
(2, '2020_08_08_020508_create_table_facilities', 1),
(3, '2020_08_08_070047_create_table_news', 1),
(4, '2020_08_08_071756_create_table_complaints', 1),
(5, '2020_08_08_135838_create_rooms', 1),
(6, '2020_08_08_141502_create_payments', 1),
(7, '2020_08_09_081042_create_facility_room_table', 1),
(8, '2022_04_20_201810_add_payment_status_on_payments', 2);

-- --------------------------------------------------------

--
-- Table structure for table `news`
--

CREATE TABLE `news` (
  `id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_sent` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `news`
--

INSERT INTO `news` (`id`, `content`, `last_sent`, `created_at`, `updated_at`) VALUES
('7a1ef567-9984-4100-8eb7-11d56f6964b5', 'Selamat Pagi!', NULL, '2022-04-08 07:38:13', '2022-04-08 07:38:13'),
('ce191122-76b7-4c9b-b9ac-831a35d93b75', 'selamat siang', '2022-01-26 08:04:29', '2022-01-26 07:23:52', '2022-01-26 08:04:29'),
('f064bc72-ac9d-4033-b33e-b904157d47dc', 'Selamat Pagi!', '2022-01-26 08:03:39', '2022-01-14 10:35:32', '2022-01-26 08:03:39');

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `photo_url` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `room_id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nominal` int(11) NOT NULL,
  `uang_diterima` int(11) NOT NULL,
  `uang_kembalian` int(11) DEFAULT NULL,
  `month` varchar(2) COLLATE utf8mb4_unicode_ci NOT NULL,
  `year` varchar(4) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('accepted','rejected') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `payments`
--

INSERT INTO `payments` (`id`, `photo_url`, `user_id`, `room_id`, `nominal`, `uang_diterima`, `uang_kembalian`, `month`, `year`, `status`, `created_at`, `updated_at`) VALUES
('1db55cd8-1661-4d48-94e7-acf977e2bab1', 'https://www.cafeteria.id/2018/08/cara-menjalankan-aplikasi-laravel-hasil.html', 'faffc946-4a25-4462-acbd-f9d675930e62', '831451a2-4334-44a4-8fb8-9de12ead169d', 250000, 250000, 0, '7', '2022', NULL, '2022-05-27 13:10:14', '2022-05-27 13:10:14'),
('3756f931-5b55-4d89-96f2-c1f9062755ac', 'blob:http://localhost:3000/9c65cc4e-d4e7-4678-99c9-1e3725e11cc9', 'dd864091-1f79-45fa-b75b-50b7c15efd52', 'a3b8ebf7-cba1-47c4-a166-51311741a5a1', 250000, 40000, -210000, '6', '2022', 'accepted', '2022-05-13 06:06:59', '2022-05-27 12:21:12'),
('8f6bb6c6-124a-4921-b374-0fca2e55bb6d', 'blob:http://localhost:3000/21d0842d-7067-4fcf-b9e4-a6777abc2ca1', 'faffc946-4a25-4462-acbd-f9d675930e62', '831451a2-4334-44a4-8fb8-9de12ead169d', 500000, 50000, -450000, '7', '2022', 'accepted', '2022-06-01 13:21:53', '2022-06-01 13:22:25'),
('e795d35c-07c5-49e3-9957-389061db4494', 'blob:http://localhost:3000/952f7db6-5323-4861-a4b2-5e2fcb3b7d1a', 'faffc946-4a25-4462-acbd-f9d675930e62', '831451a2-4334-44a4-8fb8-9de12ead169d', 500000, 10000, -490000, '9', '2022', NULL, '2022-06-01 13:22:14', '2022-06-01 13:22:14'),
('e8912b29-6ad0-46b9-8581-d35a759e7b9e', 'http://struk.jpg', 'dd864091-1f79-45fa-b75b-50b7c15efd52', 'a3b8ebf7-cba1-47c4-a166-51311741a5a1', 250000, 300000, 50000, '1', '2020', NULL, '2022-04-08 07:38:13', '2022-04-08 07:38:13');

-- --------------------------------------------------------

--
-- Table structure for table `rooms`
--

CREATE TABLE `rooms` (
  `id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `photo_url` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `size` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` int(11) NOT NULL,
  `status` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `rooms`
--

INSERT INTO `rooms` (`id`, `user_id`, `photo_url`, `name`, `size`, `price`, `status`, `created_at`, `updated_at`) VALUES
('831451a2-4334-44a4-8fb8-9de12ead169d', 'faffc946-4a25-4462-acbd-f9d675930e62', '', 'Kamar A', '5 x 5', 500000, 'TERISI', '2022-01-17 00:12:34', '2022-01-25 23:33:49'),
('a3b8ebf7-cba1-47c4-a166-51311741a5a1', 'dd864091-1f79-45fa-b75b-50b7c15efd52', 'http://kamar.jpg', 'Kamar A', '10 x 10 Meter', 250000, 'TERISI', '2022-04-08 07:38:13', '2022-04-08 07:38:13'),
('adbe42ce-f8fc-4b10-8db1-03417375a0b7', '07b2b2be-ca2f-4a81-9e1a-a6e09887adc0', 'blob:http://localhost:3000/89a6a378-6d84-4ad6-9e6c-c0a623f66dc0', 'Kamar sultan', '500 x 500', 3000000, 'TERISI', '2022-04-08 07:47:19', '2022-04-08 07:47:19');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `photo_url` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `phone`, `role`, `photo_url`, `password`, `created_at`, `updated_at`) VALUES
('07b2b2be-ca2f-4a81-9e1a-a6e09887adc0', 'kia', '6281807223388', 'PENGHUNI', 'https://api.insikost.my.id/photo/8bdc8465-2c1f-47e0-8833-a2e63e2f0b17', '$2y$10$PhsGAF.ZVCDVwMqmq2WUx.M7kZGv.2PVoR6KVpb7b4l.XU47yVJ7S', '2022-01-26 07:18:41', '2022-01-26 07:18:41'),
('284fd225-8c8b-4568-b2f3-2077fec773ec', 'alfin', '62895411499533', 'PEMILIK', 'https://alfin.jpg', '$2y$10$WVwwQ14QDSrYMBv921BXg.6NxtEE0ASMy1.sijpLoMRy5TliDtLeC', '2022-04-08 07:38:13', '2022-04-08 07:38:13'),
('3b01b163-ed40-49de-a1a8-fd006fbea5d9', 'pemilik1', '0987654321', 'PEMILIK', 'https://api.insikost.my.id/photo/48e09e03-8de6-4345-8322-09ed4db87873', '$2y$10$ycWYRplrs.fcOwwSTg8uyODaD8eBBcqP0/53omj/Hi1o6VegyVx8i', '2022-01-15 09:16:40', '2022-01-15 09:16:40'),
('dd864091-1f79-45fa-b75b-50b7c15efd52', 'ayu', '6281383688300', 'PENGHUNI', 'https://ayu.jpg', '$2y$10$DGxh1gOH7jFYnkjK012I1.mhqzWiZDokzqxDGXkbZVH4yk0Y1d4h.', '2022-04-08 07:38:13', '2022-04-08 07:38:13'),
('ec05094e-50c8-4da9-bde0-cb4263d7f439', 'ownera', '6281807223329', 'PEMILIK', 'https://api.insikost.my.id/photo/6066de4f-d67b-41fd-8bc2-0fb9c912bfd6', '$2y$10$ZO76L.IsN5pvXRMRqPIHnuyNTYIFBSZmHX.0zpfP8aTA.axhrIGaS', '2022-01-14 10:35:32', '2022-01-26 07:27:28'),
('faffc946-4a25-4462-acbd-f9d675930e62', 'Mj', '628122765400', 'PENGHUNI', 'https://api.insikost.my.id/photo/8df77010-53c4-4c1d-a195-1949d1c7e10c', '$2y$10$BwU3jnIGosdsQ5Fa9wfLLei.RK2ImPWH/wsFWGKOQJpi6Iq76SWty', '2022-01-16 22:15:10', '2022-01-26 08:03:31');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `complaints`
--
ALTER TABLE `complaints`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `complaints_id_unique` (`id`),
  ADD KEY `complaints_user_id_foreign` (`user_id`);

--
-- Indexes for table `facilities`
--
ALTER TABLE `facilities`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `facilities_id_unique` (`id`);

--
-- Indexes for table `facility_room`
--
ALTER TABLE `facility_room`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `facility_room_id_unique` (`id`),
  ADD KEY `facility_room_facility_id_foreign` (`facility_id`),
  ADD KEY `facility_room_room_id_foreign` (`room_id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `news_id_unique` (`id`);

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `payments_id_unique` (`id`);

--
-- Indexes for table `rooms`
--
ALTER TABLE `rooms`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `rooms_id_unique` (`id`),
  ADD KEY `rooms_user_id_foreign` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_id_unique` (`id`),
  ADD UNIQUE KEY `users_phone_unique` (`phone`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `facility_room`
--
ALTER TABLE `facility_room`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `complaints`
--
ALTER TABLE `complaints`
  ADD CONSTRAINT `complaints_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `facility_room`
--
ALTER TABLE `facility_room`
  ADD CONSTRAINT `facility_room_facility_id_foreign` FOREIGN KEY (`facility_id`) REFERENCES `facilities` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `facility_room_room_id_foreign` FOREIGN KEY (`room_id`) REFERENCES `rooms` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `rooms`
--
ALTER TABLE `rooms`
  ADD CONSTRAINT `rooms_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
