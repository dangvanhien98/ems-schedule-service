-- MySQL dump 10.13  Distrib 8.0.11, for Win64 (x86_64)
--
-- Host: 192.168.4.227    Database: ems_schedule
-- ------------------------------------------------------
-- Server version	8.0.21
/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */
;

/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */
;

/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */
;

SET
    NAMES utf8;

/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */
;

/*!40103 SET TIME_ZONE='+00:00' */
;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */
;

/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */
;

/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */
;

/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */
;

--
-- Dumping data for table `activity_type`
--
LOCK TABLES `activity_type` WRITE;

/*!40000 ALTER TABLE `activity_type` DISABLE KEYS */
;

/*!40000 ALTER TABLE `activity_type` ENABLE KEYS */
;

UNLOCK TABLES;

--
-- Dumping data for table `email`
--
LOCK TABLES `email` WRITE;

/*!40000 ALTER TABLE `email` DISABLE KEYS */
;

INSERT INTO
    `email`
VALUES
    (
        1,
        'meeting invitation',
        'Meeting',
        '2020-02-02 00:00:00',
        '2020-02-02 00:00:00',
        1,
        1
    ),
    (
        2,
        'notification email',
        'notification',
        '2020-04-07 00:00:00',
        '2020-02-02 00:00:00',
        1,
        1
    ),
    (
        3,
        'notification metting',
        'notification',
        '2020-08-06 00:00:00',
        '2020-02-02 00:00:00',
        1,
        1
    );

/*!40000 ALTER TABLE `email` ENABLE KEYS */
;

UNLOCK TABLES;

--
-- Dumping data for table `email_type`
--
LOCK TABLES `email_type` WRITE;

/*!40000 ALTER TABLE `email_type` DISABLE KEYS */
;

INSERT INTO
    `email_type`
VALUES
    (
        1,
        'Invention',
        'template',
        '2020-01-02 00:00:00',
        '2020-02-02 00:00:00'
    ),
    (
        2,
        'Notification',
        'template',
        '2020-02-01 00:00:00',
        '2020-02-02 00:00:00'
    );

/*!40000 ALTER TABLE `email_type` ENABLE KEYS */
;

UNLOCK TABLES;

--
-- Dumping data for table `equipment`
--
LOCK TABLES `equipment` WRITE;

/*!40000 ALTER TABLE `equipment` DISABLE KEYS */
;

INSERT INTO
    `equipment`
VALUES
    (1, 'Laptop Dell ', 'Laptop Dell 15 inch', 1),
    (2, 'Projector ', 'Projector panasonic', 1),
    (3, 'Printer', 'Printer', 1),
    (4, 'Camerra', 'Camerra Canon', 1);

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
        115,
        80,
        1,
        '2020-11-02 00:00:00',
        '2020-11-02 00:00:00'
    ),
    (
        116,
        81,
        2,
        '2020-11-02 02:00:00',
        '2020-11-02 04:00:00'
    ),
    (
        117,
        83,
        3,
        '2020-11-03 03:00:00',
        '2020-11-03 05:30:00'
    ),
    (
        118,
        83,
        1,
        '2020-11-04 01:00:00',
        '2020-11-04 02:00:00'
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
    (
        1,
        'Machine',
        'Machine ',
        '2006-02-15 04:34:33',
        '2006-02-15 04:34:33'
    );

/*!40000 ALTER TABLE `equiqment_category` ENABLE KEYS */
;

UNLOCK TABLES;

--
-- Dumping data for table `event_type`
--
LOCK TABLES `event_type` WRITE;

/*!40000 ALTER TABLE `event_type` DISABLE KEYS */
;

INSERT INTO
    `event_type`
VALUES
    (
        1,
        '2006-03-15 04:34:33',
        '2006-03-15 04:34:33',
        'Schedule'
    ),
    (
        2,
        '2008-04-15 04:34:33',
        '2015-06-15 04:34:33',
        'Todo'
    ),
    (
        3,
        '2019-05-15 04:34:33',
        '2020-07-15 04:34:33',
        'Workfollow'
    );

/*!40000 ALTER TABLE `event_type` ENABLE KEYS */
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
        34,
        'Metting',
        'This meeting will begin at 2 PM',
        '2020-11-30 13:08:23',
        2,
        '2020-10-30 07:29:35',
        '2020-10-30 07:29:35',
        2,
        NULL,
        NULL,
        NULL
    ),
    (
        35,
        'Metting 1',
        'This meeting will begin at 2 PM',
        '2020-12-30 13:08:23',
        2,
        '2020-10-30 07:32:54',
        '2020-10-30 07:32:54',
        2,
        NULL,
        NULL,
        NULL
    ),
    (
        36,
        'Metting 2',
        'This meeting will begin at 2 PM',
        '2020-12-01 13:08:23',
        2,
        '2020-10-30 07:34:32',
        '2020-10-30 07:34:32',
        2,
        NULL,
        NULL,
        NULL
    ),
    (
        37,
        'Metting 3',
        'This meeting will begin at 2 PM',
        '2020-12-06 13:08:23',
        2,
        '2020-10-30 07:40:56',
        '2020-10-30 07:40:56',
        2,
        NULL,
        NULL,
        NULL
    ),
    (
        38,
        'Metting 4',
        'This meeting will begin at 2 PM',
        '2020-12-08 13:08:23',
        2,
        '2020-10-30 08:21:51',
        '2020-10-30 08:21:51',
        2,
        NULL,
        NULL,
        NULL
    ),
    (
        39,
        'Metting 5',
        'This meeting will begin at 2 PM',
        '2020-12-12 13:08:23',
        2,
        '2020-10-30 08:34:37',
        '2020-10-30 08:34:37',
        2,
        NULL,
        NULL,
        NULL
    ),
    (
        40,
        'Metting 6',
        'This meeting will begin at 2 PM',
        '2020-12-15 13:08:23',
        2,
        '2020-10-30 08:37:34',
        '2020-10-30 08:37:34',
        2,
        NULL,
        NULL,
        NULL
    ),
    (
        41,
        'Metting 7',
        'This meeting will begin at 2 PM',
        '2020-12-18 13:08:23',
        2,
        '2020-10-30 08:55:21',
        '2020-10-30 08:55:21',
        2,
        NULL,
        NULL,
        NULL
    ),
    (
        42,
        'Metting 8',
        'This meeting will begin at 2 PM',
        '2020-12-19 13:08:23',
        2,
        '2020-10-30 09:03:05',
        '2020-10-30 09:03:05',
        2,
        NULL,
        NULL,
        NULL
    ),
    (
        43,
        'Metting 8',
        'This meeting will begin at 2 PM',
        '2020-12-20 13:08:23',
        2,
        '2020-10-30 09:24:15',
        '2020-10-30 09:24:15',
        2,
        NULL,
        NULL,
        NULL
    ),
    (
        44,
        'Metting 9',
        'This meeting will begin at 2 PM',
        '2020-12-25 13:08:23',
        2,
        '2020-10-30 09:27:46',
        '2020-10-30 09:27:46',
        2,
        NULL,
        NULL,
        NULL
    ),
    (
        45,
        'Metting 9',
        'This meeting will begin at 2 PM',
        '2020-12-26 13:08:23',
        2,
        '2020-10-30 09:41:07',
        '2020-10-30 09:41:07',
        2,
        NULL,
        NULL,
        NULL
    );

/*!40000 ALTER TABLE `notification` ENABLE KEYS */
;

UNLOCK TABLES;

--
-- Dumping data for table `schedule`
--
LOCK TABLES `schedule` WRITE;

/*!40000 ALTER TABLE `schedule` DISABLE KEYS */
;

INSERT INTO
    `schedule`
VALUES
    (
        80,
        'Project Schedule Status',
        'Review the project schedule so the team can understand the impact of delays or opportunities presented by completing work ahead of schedule.',
        '2020-02-15 04:34:33',
        '2020-03-15 04:34:33',
        '07:00:00',
        '08:00:00',
        'Normal',
        '5F meeting room',
        '\0',
        '2020-03-15 04:34:33',
        '2020-03-15 04:34:33',
        1,
        1,
        0,
        'normal',
        'normal'
    ),
    (
        81,
        'Project Scope Status',
        'Explain how much work is completed with an emphasis on significant project milestones.',
        '2020-02-16 04:34:33',
        '2020-03-15 04:34:33',
        '07:00:00',
        '08:00:00',
        'Hight',
        '4F meeting room',
        '\0',
        '2020-04-15 04:34:33',
        '2020-04-15 04:34:33',
        1,
        2,
        0,
        'normal',
        'normal'
    ),
    (
        82,
        'Team Member Updates',
        'This agenda item gives everyone on the project team to share other thoughts and comments about the project that have not been covered elsewhere.',
        '2020-03-15 04:34:33',
        '2020-04-15 04:34:33',
        '07:00:00',
        '08:00:00',
        'Normal',
        '5F meeting room',
        '\0',
        '2020-05-15 04:34:33',
        '2020-05-15 04:34:33',
        1,
        3,
        0,
        'normal',
        'normal'
    ),
    (
        83,
        'Team Introduction',
        'Take the time to go around “the table” and have each person introduce themselves.',
        '2020-02-17 04:34:33',
        '2020-02-18 04:34:33',
        '07:00:00',
        '08:00:00',
        'Normal',
        '4F meeting room',
        '\0',
        '2020-06-15 04:34:33',
        '2020-06-15 04:34:33',
        1,
        4,
        0,
        'normal',
        'normal'
    ),
    (
        84,
        'Discuss Change Assessment',
        ' For each proposed change request, present your professional opinion on the change’s impact to the project.',
        '2020-02-01 04:34:33',
        '2020-06-15 04:34:33',
        '07:00:00',
        '08:00:00',
        'Normal',
        '5F meeting room',
        '\0',
        '2020-07-15 04:34:33',
        '2020-07-15 04:34:33',
        1,
        5,
        0,
        'normal',
        'normal'
    ),
    (
        85,
        'Plan Next Steps',
        'Explain how you the change request decision will be communicated and outline how you will describe the impact of the project.',
        '2020-02-04 04:34:33',
        '2020-02-07 04:34:33',
        '07:00:00',
        '08:00:00',
        'Normal',
        '4F meeting room',
        '\0',
        '2020-08-15 04:34:33',
        '2020-08-15 04:34:33',
        1,
        6,
        0,
        'normal',
        'normal'
    ),
    (
        86,
        'Present a project update',
        'Start the meeting with a short overall project status update of five to ten minutes. Keep “project management” jargon to a minimum. ',
        '2020-02-15 04:34:33',
        '2020-02-20 04:34:33',
        '07:00:00',
        '08:00:00',
        'Normal',
        '5F meeting room',
        '\0',
        '2020-09-15 04:34:33',
        '2020-09-15 04:34:33',
        1,
        7,
        0,
        'normal',
        'normal'
    );

/*!40000 ALTER TABLE `schedule` ENABLE KEYS */
;

UNLOCK TABLES;

--
-- Dumping data for table `schedule_category`
--
LOCK TABLES `schedule_category` WRITE;

/*!40000 ALTER TABLE `schedule_category` DISABLE KEYS */
;

INSERT INTO
    `schedule_category`
VALUES
    (
        1,
        'Meeting',
        'the members of a society or committee, for discussion or entertainment.',
        '2006-02-15 04:34:33',
        '2006-02-15 04:34:33'
    ),
    (
        2,
        'interview',
        'a structured conversation where one participant asks questions, and the other provides answers',
        '2012-02-15 04:34:33',
        '2013-02-15 04:34:33'
    ),
    (
        3,
        'party',
        'a social gathering of invited guests, typically involving eating, drinking, and entertainment.',
        '2014-02-15 04:34:33',
        '2018-02-15 04:34:33'
    );

/*!40000 ALTER TABLE `schedule_category` ENABLE KEYS */
;

UNLOCK TABLES;

--
-- Dumping data for table `todo`
--
LOCK TABLES `todo` WRITE;

/*!40000 ALTER TABLE `todo` DISABLE KEYS */
;

INSERT INTO
    `todo`
VALUES
    (
        39,
        'interview in September',
        'This is a interview between leader and member',
        'Incomplete',
        '2020-02-15 04:34:33',
        'Hight',
        '2019-03-15 04:34:33',
        '2019-03-15 04:34:33',
        1,
        1
    ),
    (
        40,
        'Meeting  Schedule Project',
        'This meeting will discuss about schedule project',
        'Incomplete',
        '2020-03-14 04:34:33',
        'Normal',
        '2020-03-15 04:34:33',
        '2020-03-15 04:34:33',
        1,
        2
    ),
    (
        41,
        'Learning japanese',
        'Learning japanese',
        'Incomplete',
        '2020-06-19 02:34:33',
        'Normal',
        '2020-04-15 04:34:33',
        '2020-08-15 04:34:33',
        2,
        2
    ),
    (
        42,
        'Learning English',
        'Learning english',
        'Incomplete',
        '2020-08-26 03:34:33',
        'Normal',
        '2020-09-15 04:34:33',
        '2020-10-15 04:34:33',
        3,
        2
    );

/*!40000 ALTER TABLE `todo` ENABLE KEYS */
;

UNLOCK TABLES;

--
-- Dumping data for table `todo_category`
--
LOCK TABLES `todo_category` WRITE;

/*!40000 ALTER TABLE `todo_category` DISABLE KEYS */
;

INSERT INTO
    `todo_category`
VALUES
    (
        1,
        'meeting',
        'the importand meetings',
        '2014-03-15 04:34:33',
        '2015-03-15 04:34:33',
        1
    ),
    (
        2,
        'learning language',
        'Learning language like japanese, english, german,..',
        '2016-03-15 04:34:33',
        '2017-03-15 04:34:33',
        2
    ),
    (
        3,
        'Note',
        'note somthings importand for yourself',
        '2018-03-15 04:34:33',
        '2019-03-15 04:34:33',
        3
    );

/*!40000 ALTER TABLE `todo_category` ENABLE KEYS */
;

UNLOCK TABLES;

--
-- Dumping data for table `user`
--
LOCK TABLES `user` WRITE;

/*!40000 ALTER TABLE `user` DISABLE KEYS */
INSERT INTO
    `user`
VALUES
    (
        1,
        'dv_hien',
        '$2b$10$CwLt2BRzXqcjFC4x2UuAtej/6zpuQRvHOK2xc95AoptRXfLAano1i',
        'Đặng Văn Hiền',
        '2006-02-15 04:34:33',
        NULL
    ),
(
        2,
        'nv_quoc',
        '$2b$10$CwLt2BRzXqcjFC4x2UuAtej/6zpuQRvHOK2xc95AoptRXfLAano1i',
        'Nguyễn Văn Quốc',
        '2006-02-15 04:34:33',
        NULL
    ),
(
        3,
        'mxb_minh',
        '$2b$10$CwLt2BRzXqcjFC4x2UuAtej/6zpuQRvHOK2xc95AoptRXfLAano1i',
        'Mai Xuân Bình Minh',
        '2006-02-15 04:34:33',
        NULL
    ),
(
        4,
        'ntu_nhi',
        '$2b$10$CwLt2BRzXqcjFC4x2UuAtej/6zpuQRvHOK2xc95AoptRXfLAano1i',
        'Nguyễn Trương Uyên Nhi',
        '2006-02-15 04:34:33',
        NULL
    ),
(
        5,
        'ntk_thoa',
        '$2b$10$CwLt2BRzXqcjFC4x2UuAtej/6zpuQRvHOK2xc95AoptRXfLAano1i',
        'Nguyễn Thị Kim Thoa',
        '2006-02-15 04:34:33',
        NULL
    ),
(
        6,
        'lt_nghia',
        '$2b$10$CwLt2BRzXqcjFC4x2UuAtej/6zpuQRvHOK2xc95AoptRXfLAano1i',
        'Lê Tấn Nghĩa',
        '2006-02-15 04:34:33',
        NULL
    ),
(
        7,
        'ln_thi',
        '$2b$10$CwLt2BRzXqcjFC4x2UuAtej/6zpuQRvHOK2xc95AoptRXfLAano1i',
        'Lê Nguyên Thi',
        '2006-02-15 04:34:33',
        NULL
    ),
(
        8,
        'dt_hieu',
        '$2b$10$CwLt2BRzXqcjFC4x2UuAtej/6zpuQRvHOK2xc95AoptRXfLAano1i',
        'Dương Trung Hiếu',
        '2006-02-15 04:34:33',
        NULL
    );

/*!40000 ALTER TABLE `user` ENABLE KEYS */
;

UNLOCK TABLES;

--
-- Dumping data for table `user_email`
--
LOCK TABLES `user_email` WRITE;

/*!40000 ALTER TABLE `user_email` DISABLE KEYS */
;

INSERT INTO
    `user_email`
VALUES
    (
        1,
        1,
        1,
        '2020-02-02 00:00:00',
        '2020-02-02 00:00:00'
    ),
    (
        2,
        2,
        1,
        '2020-03-02 00:00:00',
        '2020-03-02 00:00:00'
    ),
    (
        3,
        3,
        3,
        '2020-04-02 00:00:00',
        '2020-04-02 00:00:00'
    );

/*!40000 ALTER TABLE `user_email` ENABLE KEYS */
;

UNLOCK TABLES;

--
-- Dumping data for table `user_notification`
--
LOCK TABLES `user_notification` WRITE;

/*!40000 ALTER TABLE `user_notification` DISABLE KEYS */
;

INSERT INTO
    `user_notification`
VALUES
    (
        16,
        '\0',
        '2020-10-30 07:29:35',
        '2020-10-30 07:29:35',
        1,
        34
    ),
    (
        17,
        '\0',
        '2020-10-30 07:29:35',
        '2020-10-30 07:29:35',
        2,
        34
    ),
    (
        18,
        '\0',
        '2020-10-30 07:29:35',
        '2020-10-30 07:29:35',
        3,
        34
    ),
    (
        19,
        '\0',
        '2020-10-30 07:32:54',
        '2020-10-30 07:32:54',
        1,
        35
    ),
    (
        20,
        '\0',
        '2020-10-30 07:32:54',
        '2020-10-30 07:32:54',
        2,
        35
    ),
    (
        21,
        '\0',
        '2020-10-30 07:32:54',
        '2020-10-30 07:32:54',
        3,
        35
    ),
    (
        22,
        '\0',
        '2020-10-30 07:34:32',
        '2020-10-30 07:34:32',
        1,
        36
    ),
    (
        23,
        '\0',
        '2020-10-30 07:34:32',
        '2020-10-30 07:34:32',
        2,
        36
    ),
    (
        24,
        '\0',
        '2020-10-30 07:34:32',
        '2020-10-30 07:34:32',
        3,
        36
    ),
    (
        25,
        '\0',
        '2020-10-30 07:40:56',
        '2020-10-30 07:40:56',
        1,
        37
    ),
    (
        26,
        '\0',
        '2020-10-30 07:40:56',
        '2020-10-30 07:40:56',
        2,
        37
    ),
    (
        27,
        '\0',
        '2020-10-30 07:40:56',
        '2020-10-30 07:40:56',
        3,
        37
    ),
    (
        28,
        '\0',
        '2020-10-30 08:21:51',
        '2020-10-30 08:21:51',
        1,
        38
    ),
    (
        29,
        '\0',
        '2020-10-30 08:21:51',
        '2020-10-30 08:21:51',
        2,
        38
    ),
    (
        30,
        '\0',
        '2020-10-30 08:21:51',
        '2020-10-30 08:21:51',
        3,
        38
    ),
    (
        31,
        '\0',
        '2020-10-30 08:34:37',
        '2020-10-30 08:34:37',
        1,
        39
    ),
    (
        32,
        '\0',
        '2020-10-30 08:34:37',
        '2020-10-30 08:34:37',
        2,
        39
    ),
    (
        33,
        '\0',
        '2020-10-30 08:34:37',
        '2020-10-30 08:34:37',
        3,
        39
    ),
    (
        34,
        '\0',
        '2020-10-30 08:37:34',
        '2020-10-30 08:37:34',
        1,
        40
    ),
    (
        35,
        '\0',
        '2020-10-30 08:37:34',
        '2020-10-30 08:37:34',
        2,
        40
    ),
    (
        36,
        '\0',
        '2020-10-30 08:37:34',
        '2020-10-30 08:37:34',
        3,
        40
    ),
    (
        37,
        '\0',
        '2020-10-30 08:55:21',
        '2020-10-30 08:55:21',
        1,
        41
    ),
    (
        38,
        '\0',
        '2020-10-30 08:55:21',
        '2020-10-30 08:55:21',
        2,
        41
    ),
    (
        39,
        '\0',
        '2020-10-30 08:55:21',
        '2020-10-30 08:55:21',
        3,
        41
    ),
    (
        40,
        '\0',
        '2020-10-30 09:03:05',
        '2020-10-30 09:03:05',
        1,
        42
    ),
    (
        41,
        '\0',
        '2020-10-30 09:03:05',
        '2020-10-30 09:03:05',
        2,
        42
    ),
    (
        42,
        '\0',
        '2020-10-30 09:03:05',
        '2020-10-30 09:03:05',
        3,
        42
    ),
    (
        43,
        '\0',
        '2020-10-30 09:24:15',
        '2020-10-30 09:24:15',
        1,
        43
    ),
    (
        44,
        '\0',
        '2020-10-30 09:24:15',
        '2020-10-30 09:24:15',
        2,
        43
    ),
    (
        45,
        '\0',
        '2020-10-30 09:24:15',
        '2020-10-30 09:24:15',
        3,
        43
    ),
    (
        46,
        '\0',
        '2020-10-30 09:27:46',
        '2020-10-30 09:27:46',
        1,
        44
    ),
    (
        47,
        '\0',
        '2020-10-30 09:27:46',
        '2020-10-30 09:27:46',
        2,
        44
    ),
    (
        48,
        '\0',
        '2020-10-30 09:27:46',
        '2020-10-30 09:27:46',
        3,
        44
    ),
    (
        49,
        '\0',
        '2020-10-30 09:41:07',
        '2020-10-30 09:41:07',
        1,
        45
    ),
    (
        50,
        '\0',
        '2020-10-30 09:41:07',
        '2020-10-30 09:41:07',
        2,
        45
    ),
    (
        51,
        '\0',
        '2020-10-30 09:41:07',
        '2020-10-30 09:41:07',
        3,
        45
    );

/*!40000 ALTER TABLE `user_notification` ENABLE KEYS */
;

UNLOCK TABLES;

--
-- Dumping data for table `user_schedule`
--
LOCK TABLES `user_schedule` WRITE;

/*!40000 ALTER TABLE `user_schedule` DISABLE KEYS */
;

INSERT INTO
    `user_schedule`
VALUES
    (
        230,
        '2006-02-15 04:34:33',
        '2006-02-15 04:34:33',
        1,
        81
    ),
    (
        231,
        '2016-02-15 04:34:33',
        '2016-02-15 04:34:33',
        2,
        81
    ),
    (
        232,
        '2017-02-15 04:34:33',
        '2017-02-15 04:34:33',
        3,
        81
    ),
    (
        233,
        '2018-02-15 04:34:33',
        '2018-02-15 04:34:33',
        4,
        82
    ),
    (
        234,
        '2019-02-15 04:34:33',
        '2019-02-15 04:34:33',
        5,
        82
    );

/*!40000 ALTER TABLE `user_schedule` ENABLE KEYS */
;

UNLOCK TABLES;

/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */
;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */
;

/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */
;

/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */
;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */
;

/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */
;

/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */
;

/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */
;

-- Dump completed on 2020-11-02 10:56:28