-- CREATE DATABASE  IF NOT EXISTS `ems_schedule` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
-- USE `ems_schedule`;
-- MySQL dump 10.13  Distrib 8.0.21, for Win64 (x86_64)
--
-- Host: localhost    Database: ems_schedule
-- ------------------------------------------------------
-- Server version	8.0.21
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
        3,
        'fix Category',
        'nhập dữ liệu mẫu cho Categoty',
        'Incomplete',
        '2020-09-28 15:53:27',
        'Hight',
        '2020-09-29 11:12:17',
        '2020-09-29 11:12:17',
        1,
        2
    ),
(
        4,
        '[DataBase] Create database schema',
        'Tạo mới cơ sở dữ liệu',
        'Incomplete',
        '2020-09-28 15:53:27',
        'Hight',
        '2020-09-29 11:13:05',
        '2020-09-29 11:13:05',
        1,
        1
    ),
(
        5,
        '[DataBase] Enter data for Todo',
        'nhập dữ liệu mẫu cho Todo',
        'Incomplete',
        '2020-09-28 15:53:27',
        'Hight',
        '2020-09-29 11:13:31',
        '2020-09-29 11:13:31',
        1,
        1
    ),
(
        6,
        '[BE] Implement API add new Notification',
        'API tạo mới thông báo',
        'Complete',
        '2020-09-28 15:53:27',
        'Hight',
        '2020-09-29 11:13:47',
        '2020-09-29 11:13:47',
        1,
        2
    ),
(
        7,
        '[BE] Implement API get Notification list',
        'API hiển thị tát cả thông báo',
        'Incomplete',
        '2020-09-28 15:53:27',
        'Hight',
        '2020-09-29 11:14:06',
        '2020-09-29 11:14:06',
        1,
        1
    ),
(
        8,
        '[BE] Implement API add Todo',
        'API tạo mới Todo',
        'Incomplete',
        '2020-09-28 15:53:27',
        'Hight',
        '2020-09-29 11:14:22',
        '2020-09-29 11:14:22',
        1,
        1
    ),
(
        9,
        '[BE] Implement API get todo listo',
        'API hiển thị tất cả Todo',
        'Incomplete',
        '2020-09-28 15:53:27',
        'Hight',
        '2020-09-29 11:14:44',
        '2020-09-29 11:14:44',
        1,
        1
    ),
(
        10,
        'Create Notification List Component as template',
        'Tạo component thông báo như mẫu',
        'Incomplete',
        '2020-09-28 15:53:27',
        'Hight',
        '2020-09-29 11:15:06',
        '2020-09-29 11:15:06',
        1,
        1
    ),
(
        11,
        'Create Todo List Component as template',
        'Tạo component TodoList như mẫu',
        'Incomplete',
        '2020-09-28 15:53:27',
        'Hight',
        '2020-09-29 11:15:31',
        '2020-09-29 11:15:31',
        2,
        1
    ),
(
        12,
        'Create List filter component',
        'Tạo component filter',
        'Incomplete',
        '2020-09-28 15:53:27',
        'Hight',
        '2020-09-29 11:15:47',
        '2020-09-29 11:15:47',
        2,
        1
    ),
(
        13,
        'Create Copyright component',
        'Tạo component Copyright',
        'Incomplete',
        '2020-09-28 15:53:27',
        'Hight',
        '2020-09-29 11:16:05',
        '2020-09-29 11:16:05',
        2,
        1
    ),
(
        14,
        'Create Select Multi component',
        'Tạo component Copyright',
        'Incomplete',
        '2020-09-28 15:53:27',
        'Hight',
        '2020-09-29 11:16:21',
        '2020-09-29 11:16:21',
        2,
        1
    ),
(
        15,
        'Create Header item component',
        'Tạo component Header',
        'Incomplete',
        '2020-09-28 15:53:27',
        'Hight',
        '2020-09-29 11:16:36',
        '2020-09-29 11:16:36',
        2,
        1
    ),
(
        16,
        'Create Text area component',
        'Tạo component Textarea',
        'Incomplete',
        '2020-09-28 15:53:27',
        'Hight',
        '2020-09-29 11:16:48',
        '2020-09-29 11:16:48',
        2,
        1
    ),
(
        17,
        'Create Button component',
        'Tạo component Button',
        'Incomplete',
        '2020-09-28 15:53:27',
        'Hight',
        '2020-09-29 11:17:08',
        '2020-09-29 11:17:08',
        2,
        1
    ),
(
        18,
        'Create Checkbox component',
        'Tạo component Checkbox',
        'Incomplete',
        '2020-09-28 15:53:27',
        'Hight',
        '2020-09-29 11:17:25',
        '2020-09-29 11:17:25',
        2,
        1
    ),
(
        19,
        'Create Table component',
        'Tạo component Table',
        'Incomplete',
        '2020-09-28 15:53:27',
        'Hight',
        '2020-09-29 11:17:38',
        '2020-09-29 11:17:38',
        2,
        1
    ),
(
        20,
        '[FE] Design detail TodoList',
        '[FE] Thiết kế chi tiết Màn hình hiển thị danh sách Todo',
        'Incomplete',
        '2020-09-28 15:53:27',
        'Hight',
        '2020-09-29 11:17:59',
        '2020-09-29 11:17:59',
        3,
        1
    ),
(
        21,
        'Notification documentationt',
        'Tạo tài liệu thông báo',
        'Incomplete',
        '2020-09-28 15:53:27',
        'Hight',
        '2020-09-29 11:18:16',
        '2020-09-29 11:18:16',
        3,
        1
    ),
(
        22,
        'List API, ccreen (UI)',
        'Liệt kê danh sách API, màn hình (UI)',
        'Incomplete',
        '2020-09-28 15:53:27',
        'Hight',
        '2020-09-29 11:18:35',
        '2020-09-29 11:18:35',
        3,
        1
    ),
(
        23,
        '[BE] Design detail API get todo list',
        '[BE] Thiết kế chi tiết API get todo list',
        'Incomplete',
        '2020-09-28 15:53:27',
        'Hight',
        '2020-09-29 11:18:50',
        '2020-09-29 11:18:50',
        3,
        1
    ),
(
        24,
        'Test Add TodoName',
        NULL,
        'Incomplete',
        NULL,
        'Low',
        '2020-09-30 13:38:20',
        '2020-09-30 13:38:20',
        1,
        1
    ),
(
        26,
        'Test1',
        'Test API',
        'Incomplete',
        '2020-09-28 15:53:27',
        'Low',
        '2020-10-01 13:28:01',
        '2020-10-01 13:28:01',
        2,
        1
    ),
(
        27,
        'Test2',
        'Test API',
        'Incomplete',
        '2020-09-28 15:53:27',
        'Medium',
        '2020-10-01 14:17:22',
        '2020-10-01 14:17:22',
        2,
        1
    ),
(
        28,
        'Test2',
        'Test API',
        'Incomplete',
        '2020-09-28 15:53:27',
        'Medium',
        '2020-10-07 08:22:22',
        '2020-10-07 08:22:22',
        2,
        1
    ),
(
        29,
        'Test3',
        'Test API',
        'Incomplete',
        '2020-09-28 15:53:27',
        'Important',
        '2020-10-15 08:19:37',
        '2020-10-15 08:19:37',
        2,
        1
    ),
(
        30,
        'test lào',
        NULL,
        'Incomplete',
        '2020-10-15 13:43:00',
        'Hight',
        '2020-10-15 13:43:53',
        '2020-10-15 13:43:53',
        1,
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
        'Task',
        'công việc',
        '2006-02-15 04:34:33',
        NULL,
        1
    ),
(
        2,
        'Metting',
        'Cuộc họp',
        '2006-02-15 04:34:33',
        NULL,
        2
    );

/*!40000 ALTER TABLE `todo_category` ENABLE KEYS */
;

UNLOCK TABLES;

--
-- Dumping data for table `user`
--