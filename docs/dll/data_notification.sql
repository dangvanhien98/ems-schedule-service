--
-- Dumping data for table `event`
--
LOCK TABLES `event_type` WRITE;

/*!40000 ALTER TABLE `event` DISABLE KEYS */
;

INSERT INTO
    `event_type`
VALUES
    (
        1,
        '2020-10-10 00:00:00',
        '2020-10-10 00:00:00',
        NULL,
        'Schedule'
    ),
(
        2,
        '2020-10-10 00:00:00',
        '2020-10-10 00:00:00',
        NULL,
        'Todo'
    ),
(
        3,
        '2020-10-10 00:00:00',
        '2020-10-10 00:00:00',
        NULL,
        'Example'
    ),
(
        4,
        '2020-10-10 00:00:00',
        '2020-10-10 00:00:00',
        NULL,
        'BJ'
    );

/*!40000 ALTER TABLE `event` ENABLE KEYS */
;

UNLOCK TABLES;

--
-- Dumping data for table `notification`
--
LOCK TABLES `notification` WRITE;

/*!40000 ALTER TABLE `notification` DISABLE KEYS */
;

INSERT INTO
    `notification`
VALUES
    (
        1,
        'Meeting',
        'Meeting thảo luận thiết kế chi tiết module todo + notification',
        '2020-09-29 13:08:23',
        1,
        '2020-09-28 16:16:41',
        '2020-09-28 16:16:41',
        2,
        NULL,
        NULL,
        NULL
    ),
(
        2,
        'Meeting',
        'Thảo luận xác định yêu cầu hệ thống lập lịch - 2',
        '2020-09-29 13:08:23',
        1,
        '2020-09-28 16:16:43',
        '2020-09-28 16:16:43',
        3,
        NULL,
        NULL,
        NULL
    ),
(
        3,
        'Learn Japan',
        'Learn Japan day 1',
        '2020-09-29 13:08:23',
        1,
        '2020-09-28 16:16:44',
        '2020-09-28 16:16:44',
        2,
        NULL,
        NULL,
        NULL
    ),
(
        4,
        'Learn Japan',
        'Learn Japan day 2',
        '2020-09-29 13:10:23',
        1,
        '2020-09-28 16:16:44',
        '2020-09-28 16:16:44',
        2,
        NULL,
        NULL,
        NULL
    ),
(
        5,
        'Learn Japan',
        'Learn Japam day 3',
        '2020-09-29 13:08:23',
        1,
        '2020-09-28 16:16:45',
        '2020-09-28 16:16:45',
        2,
        NULL,
        NULL,
        NULL
    ),
(
        6,
        'Learn Japan',
        'Test 1',
        '2020-09-29 13:08:23',
        0,
        '2020-09-28 16:16:46',
        '2020-09-28 16:16:46',
        1,
        NULL,
        NULL,
        NULL
    ),
(
        7,
        'Learn Japan',
        'Learn Japna day 4',
        '2020-09-29 13:11:23',
        0,
        '2020-09-28 16:16:46',
        '2020-09-28 16:16:46',
        1,
        NULL,
        NULL,
        NULL
    ),
(
        8,
        'Learn Japan',
        'Learn Japan day 5',
        '2020-09-29 13:08:23',
        0,
        '2020-09-28 16:16:47',
        '2020-09-28 16:16:47',
        1,
        NULL,
        NULL,
        NULL
    ),
(
        9,
        'Learn Japan',
        'Learn Japan day 6',
        '2020-09-29 13:08:23',
        0,
        '2020-09-28 16:16:47',
        '2020-09-28 16:16:47',
        1,
        NULL,
        NULL,
        NULL
    ),
(
        10,
        'Learn Japan',
        'Test 2',
        '2020-09-29 13:08:23',
        0,
        '2020-09-28 16:16:47',
        '2020-09-28 16:16:47',
        1,
        NULL,
        NULL,
        NULL
    ),
(
        11,
        'Meeting',
        'Thảo luận thiết kế database hệ thống',
        '2020-09-29 13:08:23',
        0,
        '2020-09-28 16:16:48',
        '2020-09-28 16:16:48',
        1,
        NULL,
        NULL,
        NULL
    ),
(
        12,
        'Meeting ',
        'Thảo luận thiết kế View cho hệ thống',
        '2020-09-29 13:08:23',
        0,
        '2020-09-28 16:16:48',
        '2020-09-28 16:16:48',
        1,
        NULL,
        NULL,
        NULL
    ),
(
        13,
        'Meeting',
        'Thảo luận về teambuiding',
        '2020-09-29 13:08:23',
        0,
        '2020-09-28 16:16:51',
        '2020-09-28 16:16:51',
        1,
        NULL,
        NULL,
        NULL
    ),
(
        14,
        'Meeting ',
        'Thảo luận phân công việc',
        '2020-09-29 13:08:23',
        0,
        '2020-09-28 16:16:52',
        '2020-09-28 16:16:52',
        1,
        NULL,
        NULL,
        NULL
    ),
(
        15,
        'Learn Japan',
        'Learn Japan day 7',
        '2020-09-29 13:08:23',
        0,
        '2020-09-28 16:16:53',
        '2020-09-28 16:16:53',
        1,
        NULL,
        NULL,
        NULL
    ),
(
        16,
        'Learn Japan',
        'Learn Japan day 8',
        '2020-09-29 13:08:23',
        0,
        '2020-09-28 16:16:53',
        '2020-09-28 16:16:53',
        1,
        NULL,
        NULL,
        NULL
    ),
(
        17,
        'Metting',
        'Review công việc',
        '2020-09-29 13:08:23',
        0,
        '2020-09-28 16:16:54',
        '2020-09-28 16:16:54',
        1,
        NULL,
        NULL,
        NULL
    ),
(
        18,
        'Meeting',
        'Báo cáo tiến độ công việc',
        '2020-09-29 13:08:23',
        0,
        '2020-09-28 16:16:55',
        '2020-09-28 16:16:55',
        1,
        NULL,
        NULL,
        NULL
    ),
(
        19,
        'Learn Japan',
        'Learn Japan day 9',
        '2020-09-29 13:08:23',
        0,
        '2020-09-28 16:16:55',
        '2020-09-28 16:16:55',
        1,
        NULL,
        NULL,
        NULL
    ),
(
        20,
        'Learn Japan',
        'Test 3',
        '2020-09-29 13:08:23',
        0,
        '2020-09-28 16:16:56',
        '2020-09-28 16:16:56',
        1,
        NULL,
        NULL,
        NULL
    ),
(
        21,
        'Metting',
        'Review công việc',
        '2020-09-29 13:08:23',
        0,
        '2020-09-28 16:17:13',
        '2020-09-28 16:17:13',
        1,
        NULL,
        NULL,
        NULL
    ),
(
        22,
        'Meeting ',
        'Đánh giá năng lực cuối tháng',
        '2020-09-29 13:08:23',
        0,
        '2020-09-28 16:17:13',
        '2020-09-28 16:17:13',
        1,
        NULL,
        NULL,
        NULL
    ),
(
        23,
        'Learn Japan',
        'Learn Japan day 10',
        '2020-09-29 13:08:23',
        0,
        '2020-09-28 16:17:14',
        '2020-09-28 16:17:14',
        1,
        NULL,
        NULL,
        NULL
    ),
(
        24,
        'Learn Japan',
        'Learn Japan day 11',
        '2020-09-29 13:08:23',
        0,
        '2020-09-28 16:17:15',
        '2020-09-28 16:17:15',
        1,
        NULL,
        NULL,
        NULL
    ),
(
        25,
        'Learn Japan',
        'Learn Japan day 12',
        '2020-09-29 13:08:23',
        0,
        '2020-09-28 16:17:15',
        '2020-09-28 16:17:15',
        1,
        NULL,
        NULL,
        NULL
    ),
(
        26,
        'Meeting ',
        'Báo cáo tiến độ công việc',
        '2020-09-29 13:08:23',
        0,
        '2020-09-28 16:17:16',
        '2020-09-28 16:17:16',
        1,
        NULL,
        NULL,
        NULL
    ),
(
        27,
        'Learn Japna',
        'Test next level',
        '2020-09-29 13:08:23',
        0,
        '2020-09-28 16:17:17',
        '2020-09-28 16:17:17',
        1,
        NULL,
        NULL,
        NULL
    ),
(
        28,
        'Test Add Notification',
        'Notification description',
        '2020-11-21 13:20:32',
        0,
        '2020-09-30 11:31:26',
        '2020-09-30 11:31:26',
        1,
        NULL,
        NULL,
        NULL
    ),
(
        29,
        'Test Add Notification',
        'Notification description',
        '2020-11-21 13:20:32',
        0,
        '2020-09-30 13:19:23',
        '2020-09-30 13:19:23',
        1,
        NULL,
        NULL,
        NULL
    );

/*!40000 ALTER TABLE `notification` ENABLE KEYS */
;

UNLOCK TABLES;