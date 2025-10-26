// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract StudentRegistry {
    struct Student {
        string name;
        string regno;
        string clgname;
        string department;
        string fileHash;
        uint256 timestamp;
        address submitter;
    }

    // Array to store all students
    Student[] public students;

    // Mapping from registration number to student index (regno => index + 1, 0 means not exists)
    mapping(string => uint256) private regnoToIndex;

    // Events
    event StudentAdded(
        string indexed regno,
        string name,
        string clgname,
        string department,
        address indexed submitter,
        uint256 timestamp
    );

    // Add a new student
    function addStudent(
        string memory _name,
        string memory _regno,
        string memory _clgname,
        string memory _department,
        string memory _fileHash
    ) public {
        require(bytes(_name).length > 0, "Name cannot be empty");
        require(bytes(_regno).length > 0, "Registration number cannot be empty");
        require(bytes(_clgname).length > 0, "College name cannot be empty");
        require(bytes(_department).length > 0, "Department cannot be empty");
        require(regnoToIndex[_regno] == 0, "Student with this registration number already exists");

        Student memory newStudent = Student({
            name: _name,
            regno: _regno,
            clgname: _clgname,
            department: _department,
            fileHash: _fileHash,
            timestamp: block.timestamp,
            submitter: msg.sender
        });

        students.push(newStudent);
        regnoToIndex[_regno] = students.length; // Store index + 1

        emit StudentAdded(_regno, _name, _clgname, _department, msg.sender, block.timestamp);
    }

    // Get all students
    function getAllStudents() public view returns (Student[] memory) {
        return students;
    }

    // Get student by registration number
    function getStudentByRegno(string memory _regno) public view returns (Student memory) {
        uint256 index = regnoToIndex[_regno];
        require(index > 0, "Student not found");
        return students[index - 1];
    }

    // Get total number of students
    function getStudentCount() public view returns (uint256) {
        return students.length;
    }

    // Check if student exists
    function studentExists(string memory _regno) public view returns (bool) {
        return regnoToIndex[_regno] > 0;
    }
}
