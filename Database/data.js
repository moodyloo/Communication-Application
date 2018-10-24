//Hard coded data
const courseList = [ 'BEng Electronic and Information Engineering',
  'BEng Electronic Engineering', 'BEng Electronic Engineering with Management',
  'BSc Computer Science', 'BSc Computer Science with a Year Abroad',
  'BSc Computer Science with a Year in Industry', 'BSc Computer Science with Intelligent Systems',
  'BSc Computer Science with Management', 'BSc Computer Science with Management and a Year Abroad',
  'BSc Computer Science with Management and a Year in Industry', 'BSc Computer Science with Robotics',
  'MEng Electronic and Information Engineering', 'MEng Electronic Engineering',
  'MEng Electronic Engineering with Management', 'MSci Computer Science',
  'MSci Robotics and Intelligent Systems', 'BSc Mathematics and Computer Science'];

const statusList = [ 'Current', 'Resit', 'Interrupted', 'Dormant', 'Provisional'];

const tutorNameList = [ 'KEVIN LANO', 'AGI KURUCZ', 'AMANDA COLES', 'VASILIS FRIDERIKOS', 'MOHAMMAD SHIKH-BAHAEI',
  'HAK-KEUNG LAM', 'PANAGIOTIS KOSMAS', 'RICHARD OVERILL', 'MATTHEW J HOWARD', 'CHRISTIAN URBAN', 'LUCA VIGANO' ,
  'SANJAY MODGIL', 'SOPHIA TSOKA', 'GRIGORIOS LOUKIDES', 'ZORAN CVETKOVIC', 'LAURENCE TRATT', 'HONGBIN LIU',
  'M.RESZA NAKHAI', 'STEFAN EDELKAMP', 'COSTAS ILIOPOULOS', 'ERNEST KAMAVUAKO', 'SIMON MILES', 'JEROEN KEPPENS',
  'DANIELE MAGAZZENI', 'JOSE SUCH', 'JAMIE BARRAS', 'MISCHA DOHLER', 'MARIA POLUKAROV', 'YANSHA DENG',
  'JOSH MURPHY', 'JIAN S DAI', 'RITA BORGO', 'TOKTAM MAHMOODI', 'ELIZABETH BLACK', 'ANDREW COLES',
  'NATALIA CRIADO PACHECO', 'SOLON PISSIS', 'HANA CHOCKLER', 'SIMON PARSONS', 'COLIN COOPER', 'MICHAEL SPRATLING',
  'ASAD ALI', 'CHRISTOPHER HAMPSON', 'HAMID AGHVAMI', 'KATHLEEN STEINHOFEL', 'OSVALDO SIMEONE', 'MARIBEL FERNANDEZ',
  'ISABEL SASSOON', 'STEVE PHELPS', 'NISHANTH SASTRY', 'ELIZABETH SKLAR', 'ALEXANDER PUSHNITSKI', 'PAYMAN L KASSAEI',
  'PAUL P.COOK', 'MAHESH KAKDE', 'NAZAR MIHEISI', 'DAVID BURNS', 'CHIARA CAMMAROTA', 'YANKI LEKILI',
  'DMITRI PANOV', 'EUGENE SHARGORODSKY', 'IGOT WIGMAN', 'NIKOLAY GROMOV', 'JURGEN BERNDT'];


const tutorEmailList = [ 'kevin.lano', 'agi.kurucz', 'amanda.coles', 'vasilis.friderikos', 'm.sbahaei',
  'hak-keung.lam', 'panagiotis.kosmas', 'richard.overill', 'matthew.j.howard', 'christian.urban', 'luca.vigano',
  'sanjay.modgil', 'sophia.tsoka', 'grigorios.loukides', 'zoran.cvetkovic', 'laurence.tratt', 'hongbin.liu',
  'reza.nakhai', 'stefan.edelkamp', 'c.iliopoulos', 'ernest.kamavuako', 'simon.miles', 'jeroen.keppens',
  'daniele.magazzeni', 'jose.such', 'jamie.barras', 'mischa.dohler', 'maria.polukarov', 'yansha.deng',
  'josh.murphy', 'jian.dai', 'rita.borgo', 'toktam.mahmoodi', 'eliabeth.black', 'andrew.coles', 'natalia.criado_pacheco',
  'solon.pissis', 'hana.chockler', 'simon.parsons', 'colin.cooper', 'michael.spratling', 'asad.ali',
  'christopher.s.hampson', 'hamid.aghvami', 'kathleen.steinhofel', 'osvaldo.simeone', 'maribel.fernandez',
  'isabel.k.sassoon', 'steve.phelps', 'nishanth.sastry', 'elizabeth.sklar', 'alexander.pushnitski',
  'payman.kassaei', 'paul.cook', 'mahesh.kakde', 'nazar.miheisi', 'david.burns', 'chiara.cammarota',
  'yanki.lekili', 'dmitri.panov', 'eugene.shargorodsky', 'igor.wigman', 'nikolay.gromov', 'jurgen.berndt'];

const maleFirstNames = [ 'JAMES', 'JOHN', 'ROBERT', 'MICHAEL', 'WILLIAM', 'DAVID', 'RICHARD', 'CHARLES', 'JOSEPH',
  'THOMAS', 'CHRISTOPHER', 'DANIEL', 'PAUL', 'MARK', 'DONALD', 'GEORGE', 'KENNETH', 'STEVEN', 'EDWARD', 'BRIAN',
  'RONALD', 'ANTHONY', 'KEVIN', 'JASON', 'MATTHEW', 'GARY', 'TIMOTHY', 'JOSE', 'LARRY', 'JEFFREY', 'FRANK', 'SCOTT',
  'ERIC', 'STEPHEN', 'ANDREW', 'RAYMOND', 'GREGORY', 'JOSHUA', 'JERRY', 'DENNIS', 'WALTER', 'PATRICK', 'PETER',
  'HAROLD', 'DOUGLAS', 'HENRY', 'CARL', 'ARTHUR', 'RYAN', 'ROGER'];

const femaleFirstNames = ['MARY', 'PATRICIA', 'LINDA', 'BARBARA', 'ELIZABETH', 'JENNIFER', 'MARIA', 'SUSAN',
  'MARGARET', 'DOROTHY', 'LISA', 'NANCY', 'KAREN', 'BETTY', 'HELEN', 'SANDRA', 'DONNA', 'CAROL', 'RUTH', 'SHARON',
  'MICHELLE', 'LAURA', 'SARAH', 'KIMBERLY', 'DEBORAH', 'JESSICA', 'SHIRLEY', 'CYNTHIA', 'ANGELA', 'MELISSA',
  'BRENDA', 'AMY', 'ANNA', 'REBECCA', 'VIRGINIA', 'KATHLEEN', 'PAMELA', 'MARTHA', 'DEBRA', 'AMANDA', 'STEPHANIE',
  'CARLOYN', 'CHRISTINE', 'MARIE', 'JANET', 'CATHERINE', 'FRANCES', 'ANN', 'JOYCE', 'DIANE'];

const lastNames = ['SMITH', 'JOHNSON', 'WILLIAMS', 'BROWN', 'JONES', 'MILLER', 'DAVIS', 'GARCIA', 'RODRIGUEZ',
  'WILSON', 'MARTINEZ', 'ANDERSON', 'TAYLOR', 'THOMAS', 'HERNANDEZ', 'MOORE', 'MARTIN', 'JACKSON',
  'THOMPSON', 'WHITE', 'LOPEZ', 'LEE', 'GONZALEZ', 'HARRIS', 'CLARK', 'LEWIS', 'ROBINSON', 'WALKER',
  'PEREZ', 'HALL', 'YOUNG', 'ALLEN', 'SANCHEZ', 'WRIGHT', 'KING', 'SCOTT', 'GREEN', 'BAKER', 'ADAMS',
  'NELSON', 'HILL', 'RAMIREZ', 'CAMPBELL', 'MITCHELL', 'ROBERTS', 'CARTER', 'PHILLIPS', 'EVANS',
  'TURNER', 'TORRES'];

module.exports = {
  data: function data() {
    return {courseList: courseList, statusList: statusList, tutorNameList: tutorNameList,
      tutorEmailList: tutorEmailList, maleFirstNames: maleFirstNames, femaleFirstNames: femaleFirstNames,
      lastNames: lastNames};
  }
};
