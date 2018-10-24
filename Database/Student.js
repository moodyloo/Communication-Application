//Extracting data from data.js
var data = require('./data.js').data();
var maleFirstNames = data.maleFirstNames;
var femaleFirstNames = data.femaleFirstNames;
var lastNames = data.lastNames;
var tutorNameList = data.tutorNameList;
var courseList = data.courseList;
var statusList = data.statusList;
var tutorEmailList = data.tutorEmailList;

//global variables used in implicitStudent function
var scj = 1;
var usernum = 1000000;

function implicitStudent (firstName, lastName, gender) {

  var student = {
    'SCJ' : null,
    'Forenames' : null,
    'Surename' : null,
    'Gender' : null,
    'Programme' : null,
    'Status' : null,
    'Year' : null,
    'KCL Email' : null,
    'Username' : null,
    'HESA Start' : null,
    'Exp End' : null,
    'Tutor name' : null,
    'Tutor Email' : null
  };

  student.SCJ = scj;
  scj++;

  student.Forenames = firstName;
  student.Surename = lastName;
  student.Gender = gender;

  student['Programme'] = courseList[Math.floor(Math.random() * courseList.length)];
  student.Status = statusList[Math.floor(Math.random() * statusList.length)];

  var BSc = student['Programme'].charAt(0) == 'B';
  if (BSc) {
    student.Year = Math.floor((Math.random() * 3) + 1);
  }else{
    student.Year = Math.floor((Math.random() * 4) + 1);
  }
  student['KCL Email'] = student.Forenames.toLowerCase() + '.' + student.Surename.toLowerCase() + '@kcl.ac.uk';
  student.Username = 'K'+usernum;
  usernum++;

  student['HESA Start'] = 15 + Math.floor((Math.random() * 2));
  if (BSc) {
    student['Exp End'] = student['HESA Start'] + 3;
  }else{
    student['Exp End'] = student['HESA Start'] + 4;
  }
  if (student.Status == 'Resit' || student.Status == 'Interrupted' || student.Status == 'Dormant') { student['Exp End']++; }
  if (student['Programme'].indexOf('Abroad') != -1) { student['Exp End']++;}
  if (student['Programme'].indexOf('Industry') != -1) { student['Exp End']++;}

  var int = Math.floor(Math.random() * tutorNameList.length);
  student['Tutor name'] = tutorNameList[int];
  student['Tutor Email'] = tutorEmailList[int] + '@kcl.ac.uk';

  student['HESA Start'] = '25/09/20' + student['HESA Start'];
  student['Exp End'] = '29/05/20' + student['Exp End'];

  return student;

}

function explicitStudent(SCJ, Forenames, Surename, Gender, Course, Status, Year, KclEmail, Username, StartYear,
  LastYear, TutorName, TutorEmail) {
  var student = {
    'SCJ' : SCJ,
    'Forenames' : Forenames,
    'Surename' : Surename,
    'Gender' : Gender,
    'Programme' : Course,
    'Status' : Status,
    'Year' : Year,
    'KCL Email' : KclEmail,
    'Username' : Username,
    'HESA Start' : StartYear,
    'Exp End' : LastYear,
    'Tutor name': TutorName,
    'Tutor email': TutorEmail
  };
  return student;
}

module.exports = {
  generateStudents: function generateStudents() {
    var students = [];

    students.push(explicitStudent(7000,'MATEN','REHIMI','M','MSci Computer Science','Current', 2, 'maten.rehimi@kcl.ac.uk',
      'k1631403', '25/09/2016','29/05/20','MARIA POLUKAROV','maria.polukarov@kcl.ac.uk'));
    students.push(explicitStudent(7001,'THIRUCHELVAN','SENTHILKUMAR','M','MSci Computer Science','Current',2,'thiruchelvan.senthilkumar@kcl.ac.uk',
      'k1631435','25/09/2016','29/05/2020','MARIA POLUKAROV','maria.polukarov@kcl.ac.uk'));
    students.push(explicitStudent(7002,'CAOKY','NGUYEN','M','BSc Computer Science','Current',2,'caoky.nguyen@kcl.ac.uk',
      'k1630481','25/09/2016','29/05/2019','M.RESZA NAKHAI','reza.nakhai@kcl.ac.uk'));
    students.push(explicitStudent(7003,'EMMANUEL','WONDIMU','M','BSc Computer Science','Current',2,'emmanuel.wondimu@kcl.ac.uk',
      'k1630993','25/09/2016','29/05/2019','PANAGIOTIS KOSMAS','panagiotis.kosmas@kcl.ac.uk'));
    students.push(explicitStudent(7004,'MING','WU','M','BSc Computer Science','Current',2,'ming.wu@kcl.ac.uk',
      'k1630477','25/09/2016','29/05/2019','VASILIS FRIDERIKOS','vasilis.friderikos@kcl.ac.uk'));
    students.push(explicitStudent(7005,'SHIVESH','KHETAN','M','BSc Computer Science','Current',2,'shivesh.khetan@kcl.ac.uk','k1630462',
      '25/09/2016','29/05/2019','ISABEL SASSOON','isabel.k.sassoon@kcl.ac.uk'));
    students.push(explicitStudent(7006,'ANTONY','KIMPTON','M','MSci Computer Science','Current',2,'antony.kimpton@kcl.ac.uk',
      'k1631398','25/09/2016','29/05/2020','JOSH MURPHY','josh.murphy@kcl.ac.uk'));
    students.push(explicitStudent(7007,'AAKASH','RANADE','M','MSci Computer Science','Current',2,'aakash.ranade@kcl.ac.uk', 'k1631072',
      '25/09/2016','29/05/2020','OSVALDO SIMEONE','osvaldo.simeone@kcl.ac.uk'));
    students.push(explicitStudent(7008,'JOHN','PHAM','M','BSc Computer Science with a Year in Industry','Current',2,'john.pham@kcl.ac.uk','k1630506',
      '25/09/2016','29/05/2020','KEVIN LANO','kevin.lano@kcl.ac.uk'));

    for (var i = 0; i < 50; i++) {
      for (var j = 0; j < 50; j++) {
        students.push(implicitStudent(maleFirstNames[i],lastNames[j],'M'));
        students.push(implicitStudent(femaleFirstNames[i],lastNames[j],'F'));
      }
    }

    return students;
  }
};
