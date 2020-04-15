DROP TABLE IF EXISTS Users;
CREATE TABLE Users (
    userID INT(11) NOT NULL AUTO_INCREMENT,
    dateJoined DATE NOT NULL,
    userName VARCHAR(255) NOT NULL,
    userPassword VARCHAR(255) NOT NULL,
    userEmail VARCHAR(255) NOT NULL,
    PRIMARY KEY (userID)
);

DROP TABLE IF EXISTS Items;
CREATE TABLE Items (
    itemID INT(11) NOT NULL AUTO_INCREMENT,
    itemName VARCHAR(255) NOT NULL,
    itemDescription VARCHAR(255) NOT NULL,
    itemPrice DECIMAL(9,2) NOT NULL,
    itemPhone VARCHAR(20) NOT NULL,
    itemAddress VARCHAR(255) NOT NULL,
    itemCity VARCHAR(50) NOT NULL,
    itemState VARCHAR(10),
    itemZip INT(11),
    itemDistance VARCHAR(50),
    PRIMARY KEY (itemID)
);

INSERT into Users (dateJoined, userName, userPassword, userEmail)
VALUES
(4/12/2020, "Samuel Chen", 12345, "chensam@oregonstate.edu");

INSERT into Items (itemName, itemDescription, itemPrice, itemPhone, itemAddress, itemCity, itemState, itemZip, itemDistance)
VALUES
("Lawnmower", "You can buy it", 31.19, 7607896532, "3973 Sepulveda Blvd", "Culver City", "CA", 90230, "87 mi | 1 hour 10 mins") 
