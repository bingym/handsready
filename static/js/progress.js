function run() {
    const oBirth = document.querySelector("#birth");
    const oDurationMonths = document.querySelector("#durationMonths");
    const oDurationYears = document.querySelector("#durationYears");
    const oPercent = document.querySelector("#percent");
    const oProgress = document.querySelector('#progress');

    const durationMonths = moment().diff(moment(oBirth.value), 'months');
    const durationYears = moment().diff(moment(oBirth.value), 'years');
    const percent = ((durationMonths / 900) * 100).toFixed(2) + '%';

    oDurationMonths.innerText = durationMonths;
    oDurationYears.innerText = durationYears;
    oPercent.innerText = percent;
    oProgress.style.width = percent;
    oProgress.innerText = percent;

    document.querySelectorAll('div.cell').forEach((element, index) => {
        if (index < durationMonths) {
            element.style.backgroundColor = "#a8a8a8";
            if (index % 12 === 0) {
                // style
            }
        } else {
            element.style.backgroundColor = ""
        }
        let text = moment(oBirth.value).add(index + 1, "months").format("YYYY-MM-DD");
        text = text + `(${Math.floor(index / 12)}岁)`;
        element.setAttribute("title", text);
    });
}

window.onload = function () {
    const cellTemplate = `<div class="cell"></div>`;
    const cellRowTemplate = `<div class="cell-row">` + `<div class="cell"></div>`.repeat(30) + `</div>`;
    let oCells = document.querySelector("#cells");
    oCells.innerHTML = cellRowTemplate.repeat(30);

    document.querySelectorAll('div.cell').forEach((element, index) => {
        if ((index + 1) % 30 === 0) {
            element.style.borderRight = '1px solid #333333';
        }
        if ((index + 30) >= 900) {
            element.style.borderBottom = '1px solid #333333';
            $(element).css("border-bottom", "1px solid #333333");
        }
    });
    const drawBtn = document.querySelector("#draw");
    drawBtn.onclick = run;
    run();
}
