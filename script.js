let callCheck = false;
$(document).ready(function () {
  let loginstatus = sessionStorage.getItem("loginstatus");
  let name = localStorage.getItem("name");
  
  // header.html 로드 후 로그인 상태 확인
  $("#header").load("header.html", function () {
    if (loginstatus === "true") {
      // 로그인 상태일 때
      $("#login, #join").hide(); // 로그인 & 회원가입 버튼 숨김
      $("#welcome-text").text(`${name}님, 환영합니다!`).show(); // 환영 메시지 표시
      $("#logout").show(); // 로그아웃 버튼 표시
    } else {
      // 로그아웃 상태일 때
      $("#login, #join").show(); // 로그인 & 회원가입 버튼 표시
      $("#welcome-text, #logout").hide(); // 환영 메시지 & 로그아웃 버튼 숨김
    }
    if(callCheck){
      timingcheck();
    }
  });
  $("#headerhome").load("headerhome.html", function () {
    if (loginstatus === "true") {
      // 로그인 상태일 때
      $("#login, #join").hide(); // 로그인 & 회원가입 버튼 숨김
      $("#welcome-text").text(`${name}님, 환영합니다!`).show(); // 환영 메시지 표시
      $("#logout").show(); // 로그아웃 버튼 표시
    } else {
      // 로그아웃 상태일 때
      $("#login, #join").show(); // 로그인 & 회원가입 버튼 표시
      $("#welcome-text, #logout").hide(); // 환영 메시지 & 로그아웃 버튼 숨김
    }
  });

  // 로그아웃 버튼 클릭 이벤트
  $(document).on("click", "#logout", function () {
    sessionStorage.setItem("loginstatus", "false");
    alert("로그아웃되었습니다.");
    window.location.href = "Home.html";
  });
});
function loginCheck(name) {
  let loginstatus = sessionStorage.getItem("loginstatus") === "true";
  if (loginstatus == true) {
    move(name);
  } else {
    alert("로그인을 해주세요.");
  }
}
function move(name) {
    window.location.href = `${name}.html`;
}
function loginChecka() {
  let loginstatus = sessionStorage.getItem("loginstatus") === "true";
  if (loginstatus != true) {
    alert("로그인을 해주세요.");
    window.location.href = "Home.html";
  } 
}
