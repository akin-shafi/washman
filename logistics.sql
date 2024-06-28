-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 28, 2024 at 01:24 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `logistics`
--

-- --------------------------------------------------------

--
-- Table structure for table `accounts`
--

CREATE TABLE `accounts` (
  `id` int(11) NOT NULL,
  `compound_id` varchar(255) NOT NULL,
  `user_id` int(11) NOT NULL,
  `provider_type` varchar(255) NOT NULL,
  `provider_id` varchar(255) NOT NULL,
  `provider_account_id` varchar(255) NOT NULL,
  `refresh_token` text DEFAULT NULL,
  `access_token` text DEFAULT NULL,
  `access_token_expires` timestamp(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `created_at` timestamp(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `id` int(11) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`id`, `first_name`, `last_name`, `email`, `phone`, `address`) VALUES
(1, 'Shafi', 'Akinropo', 'Sakinropo@gmail.com', '08145360866', 'Obate iwo osun state'),
(2, 'Shade', 'Oloruntoba', 'shade@gmail.com', '08094758345', 'House 9. Lekki Penisula '),
(3, 'Abolarinwa', 'Tunde', 'tunde@gmail.com', '08098456789', 'Ajegunle Apapa'),
(4, 'Aduke', 'Adewale', 'sandsify@gmail.com', '08145360866', 'Obate iwo osun state');

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `subject` varchar(255) DEFAULT NULL,
  `body` text DEFAULT NULL,
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`id`, `name`, `email`, `phone`, `subject`, `body`, `createdAt`, `updatedAt`) VALUES
(1, 'Shafi Adamu', 'ades@email.com', '08084758903', 'Enquiry', 'When can i come for pickup', '2024-06-03 23:04:03', '2024-06-03 23:04:03'),
(2, 'Confidence Igwe', 'article2@example.com', '09012345678', 'Feedback', 'I really enjoyed reading this article. Thank you!', '2024-06-03 23:04:03', '2024-06-03 23:04:03'),
(3, 'Juzi Major', 'article3@example.com', '07098765432', 'Question', 'Can you provide more information about the research methodology used?', '2024-06-03 23:04:03', '2024-06-03 23:04:03'),
(4, 'Ibomoere Olumofa', 'article4@example.com', '08087654321', 'Collaboration Opportunity', 'I am interested in collaborating on future projects. Please let me know how we can proceed.', '2024-06-03 23:04:03', '2024-06-03 23:04:03'),
(5, 'Fikayo Fuahd', 'article5@example.com', '08123456789', 'Correction', 'There is a factual error in paragraph three. Could you please correct it?', '2024-06-03 23:04:03', '2024-06-03 23:04:03'),
(6, 'Afolabi Legunshen', 'apho@example.com', '08123456789', 'Correction', 'There is a factual error in paragraph three. Could you please correct it?', '2024-06-03 23:04:03', '2024-06-03 23:04:03');

-- --------------------------------------------------------

--
-- Table structure for table `schedules`
--

CREATE TABLE `schedules` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `pickup_date` date DEFAULT NULL,
  `delivery_date` date DEFAULT NULL,
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `schedules`
--

INSERT INTO `schedules` (`id`, `name`, `phone`, `address`, `pickup_date`, `delivery_date`, `createdAt`, `updatedAt`) VALUES
(2, 'Chinwe Okafor', '09087654321', '15, Johnson Avenue', '2024-12-25', '2024-12-25', '2024-06-03 23:04:03', '2024-06-03 23:04:03'),
(3, 'Emeka Okonkwo', '08123456789', '22, Ikeja Road', '2025-01-03', '2025-01-03', '2024-06-03 23:04:03', '2024-06-03 23:04:03'),
(4, 'Fatima Abdullahi', '08098765432', '7, Kano Crescent', '2025-01-10', '2025-01-10', '2024-06-03 23:04:03', '2024-06-03 23:04:03'),
(5, 'David Johnson', '08012345678', '33, Liberty Street', '2025-01-17', '2025-01-17', '2024-06-03 23:04:03', '2024-06-03 23:04:03'),
(6, 'Sophia Li', '07012345678', '88, Zhongshan Road', '2025-01-24', '2025-01-24', '2024-06-03 23:04:03', '2024-06-03 23:04:03'),
(7, 'Carlos Gomez', '09123456789', '55, Avenida del Sol', '2025-01-31', '2025-01-31', '2024-06-03 23:04:03', '2024-06-03 23:04:03');

-- --------------------------------------------------------

--
-- Table structure for table `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20240606095423-create-customers.js');

-- --------------------------------------------------------

--
-- Table structure for table `services`
--

CREATE TABLE `services` (
  `id` int(11) NOT NULL,
  `heading` varchar(255) NOT NULL,
  `text` varchar(255) NOT NULL,
  `file` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `services`
--

INSERT INTO `services` (`id`, `heading`, `text`, `file`) VALUES
(1, 'Washing', 'Refresh your wardrobe with our expert laundering service, leaving them fresh and clean, ready to wear.', '1.png'),
(2, 'Ironing', 'Say goodbye to wrinkles! Our expert ironing service will leave your wears pressed and ready to impress.', '2.png'),
(3, 'Starching', 'Add that extra touch of elegance to your clothes with our premium starching service.', '3.png'),
(4, 'Premium Packaging', 'We\'ll package your wears with care and style, ready for your collection or delivery.', '4.png'),
(5, 'Stubborn stain removal', 'No stain is too tough for us to tackle. Trust our skilled team to banish even the most stubborn marks.', '5.png'),
(6, 'Door Step Delivery', 'Enjoy convenience at your doorstep as we bring our top-notch service directly to you, making laundry day a breeze.', '6.png');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `expires` timestamp(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `session_token` varchar(255) NOT NULL,
  `access_token` varchar(255) NOT NULL,
  `created_at` timestamp(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `salt` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `resetPasswordToken` varchar(255) DEFAULT NULL,
  `resetPasswordExpires` datetime DEFAULT NULL,
  `twoFactorToken` varchar(255) DEFAULT NULL,
  `twoFactorExpires` timestamp NULL DEFAULT NULL,
  `twoFactorEnabled` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `salt`, `image`, `createdAt`, `updatedAt`, `resetPasswordToken`, `resetPasswordExpires`, `twoFactorToken`, `twoFactorExpires`, `twoFactorEnabled`) VALUES
(1, 'Ade Faruq', 'sakinropo@gmail.com', '$2a$10$zfkAW3h1.A5HheLynC1QcON0LReNDv0Oj8amBmeY0kLqniyiNa25O', '$2a$10$zfkAW3h1.A5HheLynC1QcO', '', '2024-06-03 18:30:53', '2024-06-17 09:30:04', NULL, NULL, NULL, NULL, 1),
(2, 'Oba Aderopo', 'shafiakinropo@gmail.com', '$2a$10$FbE6yMBiy.VdI1/CL4YIW.Ux6O3Vk2.MtpSFVbF.ckcwxaj2MZxb6', '', '', '2024-06-07 09:20:27', '2024-06-07 09:20:27', NULL, NULL, NULL, NULL, 0),
(3, 'Abolaji', 'abolaji@gmail.com', '$2a$05$ai.KyWqF2roncwG.LEudOOF4A/5qtoUKrPJJGwYrO0pkBmAbC9c6C', '', '', '2024-06-07 10:25:57', '2024-06-07 10:25:57', NULL, NULL, NULL, NULL, 0),
(4, 'Prince Idowu', 'idowuprince@gmail.com', '$2a$10$srT2MmPq61uDmC4ZWQRfP.8/3mV/JLUnq0ATORWG5wfAhXqQf1o0O', '$2a$10$srT2MmPq61uDmC4ZWQRfP.', '', '2024-06-07 11:25:59', '2024-06-07 20:46:49', NULL, NULL, NULL, NULL, 0),
(5, 'westerners ', 'west@gmail.com', '$2a$10$SjxJfx3IL2gYj1w0mtLag.7GikBglRateXtW5vmASn4jGPLT6XUMy', '$2a$10$SjxJfx3IL2gYj1w0mtLag.', '', '2024-06-07 12:16:37', '2024-06-07 12:29:20', NULL, NULL, NULL, NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `verification_requests`
--

CREATE TABLE `verification_requests` (
  `id` int(11) NOT NULL,
  `identifier` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `expires` timestamp(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `created_at` timestamp(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `compound_id` (`compound_id`),
  ADD KEY `provider_account_id` (`provider_account_id`),
  ADD KEY `provider_id` (`provider_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `schedules`
--
ALTER TABLE `schedules`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `session_token` (`session_token`),
  ADD UNIQUE KEY `access_token` (`access_token`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `email_2` (`email`),
  ADD UNIQUE KEY `email_3` (`email`),
  ADD UNIQUE KEY `email_4` (`email`),
  ADD UNIQUE KEY `email_5` (`email`);

--
-- Indexes for table `verification_requests`
--
ALTER TABLE `verification_requests`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `token` (`token`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `accounts`
--
ALTER TABLE `accounts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `sessions`
--
ALTER TABLE `sessions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `verification_requests`
--
ALTER TABLE `verification_requests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
