-- Pilast Database Dump
SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `remarks` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

INSERT INTO `categories` (`id`, `name`, `remarks`) VALUES 
(1, 'Pilates Reformers', NULL),
(2, 'Cadillac Pilates Beds', NULL),
(3, 'Pilates Chairs', NULL),
(4, 'Pilates Barrels & Ladders', NULL),
(5, 'Complete Studio Sets', NULL),
(6, 'Pilates Accessories', NULL);

DROP TABLE IF EXISTS `settings`;
CREATE TABLE `settings` (
  `key` varchar(255) NOT NULL,
  `value` text,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `settings` (`key`, `value`) VALUES 
('address', '123 Fitness Equipment Park, Guangzhou, China'),
('email', 'sales@pilates-exporter.com'),
('phone', '+86 123 4567 8900'),
('whatsapp', '+86 123 4567 8900');

DROP TABLE IF EXISTS `media`;
CREATE TABLE `media` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `filename` varchar(255) NOT NULL,
  `url` varchar(500) NOT NULL,
  `type` varchar(100) DEFAULT NULL,
  `size` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `products`;
CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  `slug` varchar(255) NOT NULL,
  `category` text NOT NULL,
  `overview` text,
  `features` text,
  `parameters` text,
  `image_url` text,
  `images` text,
  `details_html` text,
  `seo_keywords` text,
  `seo_description` text,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=latin1;

INSERT INTO `products` (`id`, `name`, `slug`, `category`, `overview`, `features`, `parameters`, `image_url`, `images`, `details_html`, `seo_keywords`, `seo_description`, `created_at`) VALUES 
(1, 'Commercial Reformer', 'commercial-reformer', 'Pilates Reformers', 'Professional grade Commercial Reformer designed for lasting performance and durability.', '1. High-quality materials
2. Ergonomic design
3. Smooth operation', 'Material: Steel/Wood
Certifications: CE
Warranty: 2 Years', '/uploads/seed-commercial-reformer-1776224994919.jpg', '["/uploads/seed-commercial-reformer-1776224994919.jpg"]', '<p>Our <strong>Commercial Reformer</strong> represents the pinnacle of pilates equipment manufacturing.</p>', 'Commercial Reformer, Pilates Equipment, Wholesale', NULL, '2026-04-14 19:49:57'),
(2, 'Home Use Reformer', 'home-use-reformer', 'Pilates Reformers', 'Professional grade Home Use Reformer designed for lasting performance and durability.', '1. High-quality materials
2. Ergonomic design
3. Smooth operation', 'Material: Steel/Wood
Certifications: CE
Warranty: 2 Years', '/uploads/seed-home-use-reformer-1776224997180.jpg', '["/uploads/seed-home-use-reformer-1776224997180.jpg"]', '<p>Our <strong>Home Use Reformer</strong> represents the pinnacle of pilates equipment manufacturing.</p>', 'Home Use Reformer, Pilates Equipment, Wholesale', NULL, '2026-04-14 19:49:58'),
(3, 'Foldable Reformer', 'foldable-reformer', 'Pilates Reformers', 'Professional grade Foldable Reformer designed for lasting performance and durability.', '1. High-quality materials
2. Ergonomic design
3. Smooth operation', 'Material: Steel/Wood
Certifications: CE
Warranty: 2 Years', '/uploads/seed-foldable-reformer-1776224998631.jpg', '["/uploads/seed-foldable-reformer-1776224998631.jpg"]', '<p>Our <strong>Foldable Reformer</strong> represents the pinnacle of pilates equipment manufacturing.</p>', 'Foldable Reformer, Pilates Equipment, Wholesale', NULL, '2026-04-14 19:50:00'),
(4, 'Wooden Reformer', 'wooden-reformer', 'Pilates Reformers', 'Professional grade Wooden Reformer designed for lasting performance and durability.', '1. High-quality materials
2. Ergonomic design
3. Smooth operation', 'Material: Steel/Wood
Certifications: CE
Warranty: 2 Years', '/uploads/seed-wooden-reformer-1776225000182.jpg', '["/uploads/seed-wooden-reformer-1776225000182.jpg"]', '<p>Our <strong>Wooden Reformer</strong> represents the pinnacle of pilates equipment manufacturing.</p>', 'Wooden Reformer, Pilates Equipment, Wholesale', NULL, '2026-04-14 19:50:01'),
(5, 'Metal Reformer', 'metal-reformer', 'Pilates Reformers', 'Professional grade Metal Reformer designed for lasting performance and durability.', '1. High-quality materials
2. Ergonomic design
3. Smooth operation', 'Material: Steel/Wood
Certifications: CE
Warranty: 2 Years', '/uploads/seed-metal-reformer-1776225001469.jpg', '["/uploads/seed-metal-reformer-1776225001469.jpg"]', '<p>Our <strong>Metal Reformer</strong> represents the pinnacle of pilates equipment manufacturing.</p>', 'Metal Reformer, Pilates Equipment, Wholesale', NULL, '2026-04-14 19:50:02'),
(6, 'Full-Size Cadillac Bed', 'full-size-cadillac-bed', 'Cadillac Pilates Beds', 'Professional grade Full-Size Cadillac Bed designed for lasting performance and durability.', '1. High-quality materials
2. Ergonomic design
3. Smooth operation', 'Material: Steel/Wood
Certifications: CE
Warranty: 2 Years', '/uploads/seed-full-size-cadillac-bed-1776225002866.jpg', '["/uploads/seed-full-size-cadillac-bed-1776225002866.jpg"]', '<p>Our <strong>Full-Size Cadillac Bed</strong> represents the pinnacle of pilates equipment manufacturing.</p>', 'Full-Size Cadillac Bed, Pilates Equipment, Wholesale', NULL, '2026-04-14 19:50:04'),
(7, 'Compact Cadillac Bed', 'compact-cadillac-bed', 'Cadillac Pilates Beds', 'Professional grade Compact Cadillac Bed designed for lasting performance and durability.', '1. High-quality materials
2. Ergonomic design
3. Smooth operation', 'Material: Steel/Wood
Certifications: CE
Warranty: 2 Years', '/uploads/seed-compact-cadillac-bed-1776225004242.jpg', '["/uploads/seed-compact-cadillac-bed-1776225004242.jpg"]', '<p>Our <strong>Compact Cadillac Bed</strong> represents the pinnacle of pilates equipment manufacturing.</p>', 'Compact Cadillac Bed, Pilates Equipment, Wholesale', NULL, '2026-04-14 19:50:05'),
(8, 'Wall-Mounted Cadillac Bed', 'wall-mounted-cadillac-bed', 'Cadillac Pilates Beds', 'Professional grade Wall-Mounted Cadillac Bed designed for lasting performance and durability.', '1. High-quality materials
2. Ergonomic design
3. Smooth operation', 'Material: Steel/Wood
Certifications: CE
Warranty: 2 Years', '/uploads/seed-wall-mounted-cadillac-bed-1776225005586.jpg', '["/uploads/seed-wall-mounted-cadillac-bed-1776225005586.jpg"]', '<p>Our <strong>Wall-Mounted Cadillac Bed</strong> represents the pinnacle of pilates equipment manufacturing.</p>', 'Wall-Mounted Cadillac Bed, Pilates Equipment, Wholesale', NULL, '2026-04-14 19:50:07'),
(9, 'Stability Chair', 'stability-chair', 'Pilates Chairs', 'Professional grade Stability Chair designed for lasting performance and durability.', '1. High-quality materials
2. Ergonomic design
3. Smooth operation', 'Material: Steel/Wood
Certifications: CE
Warranty: 2 Years', '/uploads/seed-stability-chair-1776225007237.jpg', '["/uploads/seed-stability-chair-1776225007237.jpg"]', '<p>Our <strong>Stability Chair</strong> represents the pinnacle of pilates equipment manufacturing.</p>', 'Stability Chair, Pilates Equipment, Wholesale', NULL, '2026-04-14 19:50:08'),
(10, 'Arm Chair', 'arm-chair', 'Pilates Chairs', 'Professional grade Arm Chair designed for lasting performance and durability.', '1. High-quality materials
2. Ergonomic design
3. Smooth operation', 'Material: Steel/Wood
Certifications: CE
Warranty: 2 Years', '/uploads/seed-arm-chair-1776225008678.jpg', '["/uploads/seed-arm-chair-1776225008678.jpg"]', '<p>Our <strong>Arm Chair</strong> represents the pinnacle of pilates equipment manufacturing.</p>', 'Arm Chair, Pilates Equipment, Wholesale', NULL, '2026-04-14 19:50:10'),
(11, 'High Chair', 'high-chair', 'Pilates Chairs', 'Professional grade High Chair designed for lasting performance and durability.', '1. High-quality materials
2. Ergonomic design
3. Smooth operation', 'Material: Steel/Wood
Certifications: CE
Warranty: 2 Years', '/uploads/seed-high-chair-1776225010175.jpg', '["/uploads/seed-high-chair-1776225010175.jpg"]', '<p>Our <strong>High Chair</strong> represents the pinnacle of pilates equipment manufacturing.</p>', 'High Chair, Pilates Equipment, Wholesale', NULL, '2026-04-14 19:50:11'),
(12, 'Ladder Barrel', 'ladder-barrel', 'Pilates Barrels & Ladders', 'Professional grade Ladder Barrel designed for lasting performance and durability.', '1. High-quality materials
2. Ergonomic design
3. Smooth operation', 'Material: Steel/Wood
Certifications: CE
Warranty: 2 Years', '/uploads/seed-ladder-barrel-1776225011599.jpg', '["/uploads/seed-ladder-barrel-1776225011599.jpg"]', '<p>Our <strong>Ladder Barrel</strong> represents the pinnacle of pilates equipment manufacturing.</p>', 'Ladder Barrel, Pilates Equipment, Wholesale', NULL, '2026-04-14 19:50:12'),
(13, 'Spine Corrector Barrel', 'spine-corrector-barrel', 'Pilates Barrels & Ladders', 'Professional grade Spine Corrector Barrel designed for lasting performance and durability.', '1. High-quality materials
2. Ergonomic design
3. Smooth operation', 'Material: Steel/Wood
Certifications: CE
Warranty: 2 Years', '/uploads/seed-spine-corrector-barrel-1776225012925.jpg', '["/uploads/seed-spine-corrector-barrel-1776225012925.jpg"]', '<p>Our <strong>Spine Corrector Barrel</strong> represents the pinnacle of pilates equipment manufacturing.</p>', 'Spine Corrector Barrel, Pilates Equipment, Wholesale', NULL, '2026-04-14 19:50:14'),
(14, 'Small Barrel', 'small-barrel', 'Pilates Barrels & Ladders', 'Professional grade Small Barrel designed for lasting performance and durability.', '1. High-quality materials
2. Ergonomic design
3. Smooth operation', 'Material: Steel/Wood
Certifications: CE
Warranty: 2 Years', '/uploads/seed-small-barrel-1776225014200.jpg', '["/uploads/seed-small-barrel-1776225014200.jpg"]', '<p>Our <strong>Small Barrel</strong> represents the pinnacle of pilates equipment manufacturing.</p>', 'Small Barrel, Pilates Equipment, Wholesale', NULL, '2026-04-14 19:50:15'),
(15, '3-Piece Basic Set', '3-piece-basic-set', 'Complete Studio Sets', 'Professional grade 3-Piece Basic Set designed for lasting performance and durability.', '1. High-quality materials
2. Ergonomic design
3. Smooth operation', 'Material: Steel/Wood
Certifications: CE
Warranty: 2 Years', '/uploads/seed-3-piece-basic-set-1776225015525.jpg', '["/uploads/seed-3-piece-basic-set-1776225015525.jpg"]', '<p>Our <strong>3-Piece Basic Set</strong> represents the pinnacle of pilates equipment manufacturing.</p>', '3-Piece Basic Set, Pilates Equipment, Wholesale', NULL, '2026-04-14 19:50:16'),
(16, '5-Piece Premium Set', '5-piece-premium-set', 'Complete Studio Sets', 'Professional grade 5-Piece Premium Set designed for lasting performance and durability.', '1. High-quality materials
2. Ergonomic design
3. Smooth operation', 'Material: Steel/Wood
Certifications: CE
Warranty: 2 Years', '/uploads/seed-5-piece-premium-set-1776225016987.jpg', '["/uploads/seed-5-piece-premium-set-1776225016987.jpg"]', '<p>Our <strong>5-Piece Premium Set</strong> represents the pinnacle of pilates equipment manufacturing.</p>', '5-Piece Premium Set, Pilates Equipment, Wholesale', NULL, '2026-04-14 19:50:18'),
(17, 'Custom Studio Package', 'custom-studio-package', 'Complete Studio Sets', 'Professional grade Custom Studio Package designed for lasting performance and durability.', '1. High-quality materials
2. Ergonomic design
3. Smooth operation', 'Material: Steel/Wood
Certifications: CE
Warranty: 2 Years', '/uploads/seed-custom-studio-package-1776225018465.jpg', '["/uploads/seed-custom-studio-package-1776225018465.jpg"]', '<p>Our <strong>Custom Studio Package</strong> represents the pinnacle of pilates equipment manufacturing.</p>', 'Custom Studio Package, Pilates Equipment, Wholesale', NULL, '2026-04-14 19:50:19'),
(18, 'Resistance Springs', 'resistance-springs', 'Pilates Accessories', 'Professional grade Resistance Springs designed for lasting performance and durability.', '1. High-quality materials
2. Ergonomic design
3. Smooth operation', 'Material: Steel/Wood
Certifications: CE
Warranty: 2 Years', '/uploads/seed-resistance-springs-1776225019854.jpg', '["/uploads/seed-resistance-springs-1776225019854.jpg"]', '<p>Our <strong>Resistance Springs</strong> represents the pinnacle of pilates equipment manufacturing.</p>', 'Resistance Springs, Pilates Equipment, Wholesale', NULL, '2026-04-14 19:50:21'),
(19, 'Pilates Mats', 'pilates-mats', 'Pilates Accessories', 'Professional grade Pilates Mats designed for lasting performance and durability.', '1. High-quality materials
2. Ergonomic design
3. Smooth operation', 'Material: Steel/Wood
Certifications: CE
Warranty: 2 Years', '/uploads/seed-pilates-mats-1776225021311.jpg', '["/uploads/seed-pilates-mats-1776225021311.jpg"]', '<p>Our <strong>Pilates Mats</strong> represents the pinnacle of pilates equipment manufacturing.</p>', 'Pilates Mats, Pilates Equipment, Wholesale', NULL, '2026-04-14 19:50:22'),
(20, 'Foot Straps', 'foot-straps', 'Pilates Accessories', 'Professional grade Foot Straps designed for lasting performance and durability.', '1. High-quality materials
2. Ergonomic design
3. Smooth operation', 'Material: Steel/Wood
Certifications: CE
Warranty: 2 Years', '/uploads/seed-foot-straps-1776225022681.jpg', '["/uploads/seed-foot-straps-1776225022681.jpg"]', '<p>Our <strong>Foot Straps</strong> represents the pinnacle of pilates equipment manufacturing.</p>', 'Foot Straps, Pilates Equipment, Wholesale', NULL, '2026-04-14 19:50:24'),
(21, 'Handles', 'handles', 'Pilates Accessories', 'Professional grade Handles designed for lasting performance and durability.', '1. High-quality materials
2. Ergonomic design
3. Smooth operation', 'Material: Steel/Wood
Certifications: CE
Warranty: 2 Years', '/uploads/seed-handles-1776225024021.jpg', '["/uploads/seed-handles-1776225024021.jpg"]', '<p>Our <strong>Handles</strong> represents the pinnacle of pilates equipment manufacturing.</p>', 'Handles, Pilates Equipment, Wholesale', NULL, '2026-04-14 19:50:25'),
(22, 'Padding Covers', 'padding-covers', 'Pilates Accessories', 'Professional grade Padding Covers designed for lasting performance and durability.', '1. High-quality materials
2. Ergonomic design
3. Smooth operation', 'Material: Steel/Wood
Certifications: CE
Warranty: 2 Years', '/uploads/seed-padding-covers-1776225025476.jpg', '["/uploads/seed-padding-covers-1776225025476.jpg"]', '<p>Our <strong>Padding Covers</strong> represents the pinnacle of pilates equipment manufacturing.</p>', 'Padding Covers, Pilates Equipment, Wholesale', NULL, '2026-04-14 19:50:26');

SET FOREIGN_KEY_CHECKS = 1;