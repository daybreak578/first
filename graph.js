 //ajax
 $(document).ready(function () {
    //경상 :906,905,908,915
    //충청 : 907,958,903
    //전라 : 927,928(입구만),904
    //서울 : 918
    //경기:901,919
    //강원:902
    const regionCodes = ["906", "905", "908", "915"];
    const requests = regionCodes.map(function (code) {
        return $.ajax({
            url: "https://data.ex.co.kr/openapi/trafficapi/trafficRegion",
            type: "GET",
            data: {
                key: "3762609281",
                type: "json",
                numOfRows: 99,
                pageNo: 1,
                regionCode: code,
                inoutType: 0
            },
            dataType: "json"
        });
    });

    $.when.apply($, requests).done(function () {
        const responses = [].slice.call(arguments).map(function (response) {
            return response[0]; // 각 AJAX 응답의 첫 번째 인자
        });
        var totalTraffic = [];
        let traffic = 0;
        var name = [];
        for (let j = 0; j < responses.length; j++) {
            let response = responses[j];
            for (let k = 0; k < response.trafficRegion.length; k++) {
                let item = response.trafficRegion[k];
                traffic += parseInt(item.trafficAmout) || 0;
            }

            totalTraffic[j] = traffic;
            name[j] = response.trafficRegion[0].regionName
            console.log("전체 교통량:", totalTraffic[j]);
            console.log("지역:", name[j]);
        }
        console.log(responses);

        let backgroundColors = [];
        let borderColors = [];
        function getRandomColor() {
            var r = Math.floor(Math.random() * 256);
            var g = Math.floor(Math.random() * 256);
            var b = Math.floor(Math.random() * 256);
            return 'rgba(' + r + ', ' + g + ', ' + b + ')';
        }
        for (var i = 0; i < name.length; i++) {
            // 배경색은 투명도 0.2, 테두리색은 불투명하게 생성
            backgroundColors.push(getRandomColor());
            borderColors.push('black');
        }
        let ctx = document.getElementById('myChart').getContext('2d');
        let myChart = new Chart(ctx, {
            type: 'bar', // 차트 종류를 bar로 설정
            data: {
                labels: name, // x축 레이블
                datasets: [{
                    label: '교통량',
                    data: totalTraffic, // 각 막대의 데이터 값
                    backgroundColor: backgroundColors,
                    borderColor: borderColors,
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true, // 반응형 설정
                aspectRatio: 0.78,
                scales: {
                    y: {
                        beginAtZero: true // y축을 0부터 시작
                    }
                }
            }
        });

    }).fail(function () {
        console.error("API 요청 중 오류 발생");
        $("#result").text("API 요청 중 오류 발생");
    });
});