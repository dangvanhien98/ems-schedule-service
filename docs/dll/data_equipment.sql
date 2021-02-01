--
-- Dumping data for table `equipment`
--
LOCK TABLES `equipment` WRITE;

/*!40000 ALTER TABLE `equipment` DISABLE KEYS */
;

INSERT INTO
    `equipment`
VALUES
    (1, 'Máy quay', NULL, 1),
(2, 'Máy chiếu', NULL, 1),
(3, 'Máy tính', NULL, 1),
(4, 'Máy tính nhỏ', NULL, 1),
(5, 'ghế', NULL, 1),
(6, 'bàn', NULL, 1);

/*!40000 ALTER TABLE `equipment` ENABLE KEYS */
;

UNLOCK TABLES;

--
-- Dumping data for table `equipment_used`
--
LOCK TABLES `equipment_used` WRITE;

/*!40000 ALTER TABLE `equipment_used` DISABLE KEYS */
;

INSERT INTO
    `equipment_used`
VALUES
    (
        55,
        9,
        1,
        '2020-10-30 01:08:22',
        '2020-10-30 01:08:22'
    ),
(
        56,
        9,
        2,
        '2020-10-30 01:08:22',
        '2020-10-30 01:08:22'
    ),
(
        57,
        9,
        3,
        '2020-10-30 01:08:22',
        '2020-10-30 01:08:22'
    ),
(
        58,
        10,
        1,
        '2020-10-30 01:08:22',
        '2020-10-30 01:08:22'
    ),
(
        59,
        10,
        2,
        '2020-10-30 01:08:22',
        '2020-10-30 01:08:22'
    ),
(
        60,
        10,
        3,
        '2020-10-30 01:08:22',
        '2020-10-30 01:08:22'
    ),
(
        61,
        11,
        1,
        '2020-10-30 01:08:22',
        '2020-10-30 01:08:22'
    ),
(
        62,
        11,
        2,
        '2020-10-30 01:08:22',
        '2020-10-30 01:08:22'
    ),
(
        63,
        11,
        3,
        '2020-10-30 01:08:22',
        '2020-10-30 01:08:22'
    ),
(
        64,
        12,
        1,
        '2020-10-30 01:08:22',
        '2020-10-30 01:08:22'
    ),
(
        65,
        12,
        2,
        '2020-10-30 01:08:22',
        '2020-10-30 01:08:22'
    ),
(
        66,
        12,
        3,
        '2020-10-30 01:08:22',
        '2020-10-30 01:08:22'
    ),
(
        67,
        2,
        1,
        '2020-10-30 01:08:22',
        '2020-10-30 01:08:22'
    ),
(
        68,
        2,
        2,
        '2020-10-30 01:08:22',
        '2020-10-30 01:08:22'
    ),
(
        69,
        2,
        3,
        '2020-10-30 01:08:22',
        '2020-10-30 01:08:22'
    ),
(
        70,
        13,
        1,
        '2020-10-30 01:08:22',
        '2020-10-30 01:08:22'
    ),
(
        71,
        13,
        2,
        '2020-10-30 01:08:22',
        '2020-10-30 01:08:22'
    ),
(
        72,
        13,
        3,
        '2020-10-30 01:08:22',
        '2020-10-30 01:08:22'
    ),
(
        73,
        17,
        1,
        '2020-10-30 01:08:22',
        '2020-10-30 01:08:22'
    ),
(
        74,
        17,
        2,
        '2020-10-30 01:08:22',
        '2020-10-30 01:08:22'
    ),
(
        75,
        17,
        3,
        '2020-10-30 01:08:22',
        '2020-10-30 01:08:22'
    );

/*!40000 ALTER TABLE `equipment_used` ENABLE KEYS */
;

UNLOCK TABLES;

--
-- Dumping data for table `equiqment_category`
--
LOCK TABLES `equiqment_category` WRITE;

/*!40000 ALTER TABLE `equiqment_category` DISABLE KEYS */
;

INSERT INTO
    `equiqment_category`
VALUES
    (1, 'Máy', 'Máy', NULL, NULL);

/*!40000 ALTER TABLE `equiqment_category` ENABLE KEYS */
;

UNLOCK TABLES;