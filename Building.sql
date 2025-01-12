DROP DATABASE IF EXISTS BuildingLift;

CREATE DATABASE BuildingLift;
USE  BuildingLift;


-- creating table 
CREATE TABLE Building(
  BuildingID int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  BuildingName varchar(255) NOT NULL,
  Adress varchar(255) NOT NULL
);

CREATE TABLE Lift(
  LiftID int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  BuildingID int NOT NULL,
  Capacity int NOT NULL,
  CurrentFloor int NOT NULL,
  Speed int NOT NULL,
  Status enum('Active','Maintance'),
  FOREIGN KEY (BuildingID) REFERENCES Building(BuildingID)
);

CREATE TABLE Floor(
  FloorID int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  BuildingID int NOT NULL,
  FloorNumber int NOT NULL,
  FOREIGN KEY (BuildingID) REFERENCES Building(BuildingID)

);

CREATE TABLE Maintainence(
  MaintainenceID int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  LiftID int NOT NULL,
  MaintainenceDate date NOT NULL,
  MaintainenceTime time NOT NULL,
  MaintainenceDescription varchar(255) NOT NULL,
  FOREIGN KEY (LiftID) REFERENCES Lift(LiftID)
);

  CREATE TABLE Users(
  UserID int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  Username varchar(255) NOT NULL
  );

CREATE TABLE LiftReq(
  LiftReqID int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  LiftID int NOT NULL,
  UserID int NOT NULL,
  SourceFloor int NOT NULL,
  DestinationFloor int NOT NULL,
  FOREIGN KEY (LiftID) REFERENCES Lift(LiftID),
  FOREIGN KEY (UserID) REFERENCES Users(UserID)
);


-- inserting the values in the tables
INSERT INTO Building (BuildingName, Adress)
VALUES 
('Pune Heights ','123 Baner ,Pune'),
('Pune Residency ','Pashan Palace ,Pune'),
('Pune IT Hub','404 Hinjawadi,Pune'),
('Pune Towers','101 Sb raod,Pune'),
('Pune House ','Koregaon Park, Pune');


INSERT INTO Lift (BuildingID, Capacity, CurrentFloor, Speed, Status)
VALUES 
(1, 10, 1, 2, 'Active'),
(1, 15, 5, 3, 'Maintance'),
(2, 8, 3, 2, 'Active'),
(3, 12, 4, 4, 'Active'),
(4, 6, 2, 1, 'Maintance');


INSERT INTO Floor (BuildingID, FloorNumber)
VALUES 
-- Pune Heights
(1, 1), 
(1, 2), 
(1, 3), 
(1, 4), 
(1, 5),

-- Pune Residency 
(2, 1), 
(2, 2), 
(2, 3), 
(2, 4), 
(2, 5), 
(2, 6),

-- Pune IT Hub
(3, 1), 
(3, 2), 
(3, 3), 
(3, 4), 
(3, 5), 
(3, 6), 
(3, 7),

-- Pune Towers
(4, 1), 
(4, 2), 
(4, 3), 
(4, 4), 
(4, 5), 
(4, 6), 
(4, 7), 
(4, 8),

-- Pune house 
(5, 1), 
(5, 2), 
(5, 3), 
(5, 4), 
(5, 5);


INSERT INTO Lift (BuildingID, Capacity, CurrentFloor, Speed, Status)
VALUES 
-- Lifts for Pune Height
(1, 10, 1, 2, 'Active'), 
(1, 8, 3, 2, 'Maintance'),

-- Lifts for Pune Residency
(2, 12, 2, 3, 'Active'), 
(2, 15, 1, 4, 'Active'),

-- Lifts for Pune IT Hub
(3, 10, 4, 3, 'Active'), 
(3, 12, 1, 2, 'Maintance'),

-- Lifts for Pune Towers
(4, 8, 3, 2, 'Active'), 
(4, 10, 5, 3, 'Maintance'),

-- Lifts for Pune House
(5, 6, 1, 1, 'Active'), 
(5, 8, 2, 2, 'Active');


INSERT INTO Users (Username)
VALUES 
('Pradeep'), 
('Vineet'), 
('Ketan'), 
('Nishant'), 
('Shahid');



INSERT INTO Maintainence (LiftID, MaintainenceDate, MaintainenceTime, MaintainenceDescription)
VALUES 
(2, '2025-01-05', '09:30:00', 'Routine checkup'), 
(3, '2025-01-08', '12:45:00', 'Sensor replacement'), 
(6, '2025-01-10', '15:20:00', 'Motor service'), 
(8, '2025-01-12', '11:00:00', 'Cable inspection'), 
(4, '2025-01-15', '14:30:00', 'Brake testing');


INSERT INTO LiftReq (LiftID, UserID, SourceFloor, DestinationFloor)
VALUES 
(1, 1, 1, 5), 
(2, 2, 2, 4), 
(3, 3, 3, 6), 
(4, 4, 1, 5), 
(5, 5, 1, 7),
(6, 1, 2, 3),
(7, 2, 5, 1),
(8, 3, 4, 6),
(9, 4, 3, 8),
(10, 5, 1, 5);



-- getting  details of the tables 
SELECT * FROM Building;
SELECT * FROM Floor;
SELECT * FROM Lift;
SELECT * FROM Users;
SELECT * FROM Maintainence;
SELECT * FROM LiftReq;

-- getting lift which are under maintance
SELECT * 
FROM Lift 
WHERE Status = 'Maintance'
ORDER BY BuildingID;

--top 3 most recent lift under maintance

SELECT * FROM Maintainence
ORDER BY MaintainenceDate DESC, MaintainenceTime DESC
LIMIT 3;


-- get lift where sourcefloor is between 2 or 4
SELECT * 
FROM LiftReq 
WHERE SourceFloor 
BETWEEN 2 AND 4 ; 


-- user who made the request for the lifts
SELECT LiftReq.LiftReqID, Users.Username, LiftReq.SourceFloor, LiftReq.DestinationFloor
FROM LiftReq
JOIN Users ON LiftReq.UserID = Users.UserID;


-- counting total number of lifts in each building
SELECT BuildingID, COUNT(LiftID) 
FROM Lift
GROUP BY BuildingID;



-- getting building having more than 3 lifts
SELECT BuildingID, COUNT(*) AS LiftCount
FROM Lift
GROUP BY BuildingID
HAVING LiftCount > 3;


-- getting lifts that are in building 1,2,3
SELECT * 
FROM Lift 
WHERE BuildingID in (1,2,3);

-- updating a particular lift 
Update Lift set Status="Active" WHERE LiftID=2;


-- deleting a record
delete from Maintainence where LiftID=5;


--adding a new colum to Lift 
ALTER TABLE Lift
ADD DateInstalled DATE;


-- geting all unique sourcefloor
SELECT DISTINCT SourceFloor
FROM LiftReq;


-- getting total number of users
SELECT COUNT(*) AS TotalUsers
FROM Users;


-- getting lift that has been requesting the highest time
SELECT LiftID, COUNT(*) AS Req
FROM LiftReq
GROUP BY LiftID
ORDER BY Req DESC
LIMIT 1;
