function reverseString(str) {
    return str.split("").reverse().join("");
  }
  
  function isStringPalindrome(str) {
    return str === reverseString(str);
  }
  
  function getDateAsString(date) {
    if (date.day < 10) {
      date.day = "0" + date.day;
    } else {
      date.day = String(date.day);
    }
    if (date.month < 10) {
      date.month = "0" + date.month;
    } else {
      date.month = String(date.month);
    }
    date.year = String(date.year);
  
    return date;
  }
  
  function getDateInAllFormats(date) {
    var ddmmyyy = date.day + date.month + date.year;
    var mmddyyy = date.month + date.day + date.year;
    var yyymmdd = date.year + date.month + date.day;
    var ddmmyy = date.day + date.month + date.year.slice(-2);
    var mmddyy = date.month + date.day + date.year.slice(-2);
    var yymmdd = date.year.slice(-2) + date.month + date.day;
  
    return [ddmmyyy, mmddyyy, yyymmdd, ddmmyy, mmddyy, yymmdd];
  }
  
  function checkPalindromeForAllDateFormats(date) {
    let allDate = getDateInAllFormats(date);
    let listPalindrome = [];
    let flag = false;
    for (i = 0; i < allDate.length; i++) {
      let result = isStringPalindrome(allDate[i]);
      listPalindrome.push(result);
    }
    return listPalindrome;
  }
  
  function isLeapYear(year) {
    if (year % 400 === 0) {
      return true;
    }
    if (year % 100 === 0) {
      return false;
    }
    if (year % 4 === 0) {
      return true;
    }
    return false;
  }
  
  function getNextDate(date) {
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;
  
    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  
    if (month === 2) {
      if (isLeapYear(year)) {
        if (day > 29) {
          day = 1;
          month++;
        }
      } else {
        if (day > 28) {
          day = 1;
          month++;
        }
      }
    } else {
      if (day > daysInMonth[month - 1]) {
        day = 1;
        month++;
      }
    }
  
    if (month > 12) {
      month = 1;
      year++;
    }
  
    return {
      day: day,
      month: month,
      year: year,
    };
  }
  
  function nextPalindromeDate(date) {
    var nextDate = getNextDate(date);
    var count = 0;
  
    while (1) {
      count++;
      var dateStr = getDateAsString(nextDate);
      var resultList = checkPalindromeForAllDateFormats(dateStr);
  
      for (let i = 0; i < resultList.length; i++) {
        if (resultList[i]) {
          return [count, nextDate];
        }
      }
      nextDate = getNextDate(nextDate);
    }
  }
  
  function getPreviousDate(date) {
    var day = date.day - 1;
    var month = date.month;
    var year = date.year;
  
    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  
    if (day === 0) {
      month--;
  
      if (month === 0) {
        month = 12;
        day = 31;
        year--;
      } else if (month === 2) {
        if (isLeapYear(year)) {
          day = 29;
        } else {
          day = 28;
        }
      } else {
        day = daysInMonth[month - 1];
      }
    }
  
    return {
      day: day,
      month: month,
      year: year,
    };
  }
  
  function previousPalindromeDate(date) {
    var previousDate = getPreviousDate(date);
    var count = 0;
  
    while (1) {
      count++;
      var dateStr = getDateAsString(previousDate);
      var resultList = checkPalindromeForAllDateFormats(dateStr);
  
      for (let i = 0; i < resultList.length; i++) {
        if (resultList[i]) {
          return [count, previousDate];
        }
      }
      previousDate = getPreviousDate(previousDate);
    }
  }
  
  var dob = document.querySelector("#dob");
  var chkBtn = document.querySelector("#chkBtn");
  var result = document.querySelector("#result");
  
  function checkPalindrome(event) {
    var dobVal = dob.value;
  
    if (dobVal !== "") {
      var date = dobVal.split("-");
      var yyyy = date[0];
      var mm = date[1];
      var dd = date[2];
  
      var date = {
        day: Number(dd),
        month: Number(mm),
        year: Number(yyyy),
      };
  
      var dateStr = getDateAsString(date);
      var dateList = checkPalindromeForAllDateFormats(dateStr);
      var isPalindrome = false;
      // console.log(Ok);
      for (let i = 0; i < dateList.length; i++) {
        if (dateList[i]) {
          isPalindrome = true;
          break;
        }
      }
  
      if (!isPalindrome) {
        const [count1, nextDate] = nextPalindromeDate(date);
        const [count2, prevDate] = previousPalindromeDate(date);
  
        if (count1 > count2) {
          result.innerText = `The nearest palindrome date is ${prevDate.day}-${prevDate.month}-${prevDate.year}, you missed by ${count2} days.`;
        } else {
          result.innerText = `The nearest palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed by ${count1} days.`;
        }
      } else {
        result.innerText = "Yay! Your birthday is palindrome!";
      }
    }
  }
  
  chkBtn.addEventListener("click", checkPalindrome);
  
  // var sampDate = {
  //   day: 31,
  //   month: 12,
  //   year: 2020,
  // };
  // sampDate = getDateAsString(sampDate);
  // console.log(checkPalindrome("121"));
  // console.log(getDateInAllFormats(sampDate));
  // console.log(checkPalindromeForAllDateFormats(sampDate));
  // console.log(getNextDate(sampDate));
  // console.log(nextPalindromeDate(sampDate));