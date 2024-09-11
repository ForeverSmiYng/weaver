/*
dom_id为字符串，表示单元格元素id，必填
fieldid为字符串，表示字段id，可把打星结果存入对应字段，必填
fieldValue为数组，表示每颗星对应的字段值，数组第0个值为0颗星的value，第1个值为第1个星的value，必填
noChoose为数字，表示是否允许取消选择，1表示允许，非1表示不允许，默认不允许，非必填
text_arr为数组，表示每颗星的备注，数组第0个值为0颗星的备注，实际无作用，第1个值为第1个星的备注，默认备注为“1星、2星”，非必填
size为数字，表示星星的大小，单位为px
justify_content为字符串，表示星星的横向布局，默认为“left”靠左，一般可选“right”和“center”
*/
function emojiRating(dom_id, fieldid, fieldValue, noChoose, text_arr, size, justify_content) {
  let sr_size = size == undefined ? 20 : size;
  let sr_justify_content = justify_content == undefined ? "left" : justify_content;
  let sr_noChoose = noChoose == 1 ? 1 : 0;
  let sr_text_arr = [];
  if (text_arr == undefined || text_arr.length != fieldValue.length) {
    fieldValue.forEach((e, index) => {
      sr_text_arr.push(index + "星");
    });
  } else {
    sr_text_arr = text_arr;
  }
  //添加CSS样式
  let style = document.createElement('style');
  let css = `
  .${dom_id}_rating:not(:checked) > input {
    position: absolute;
    appearance: none;
  }
  
  .${dom_id}_rating:not(:checked) > label {
    float: right;
    cursor: pointer;
    font-size: ${sr_size}px;
    fill: #fff;
  }
  
  .${dom_id}_rating:not(:checked) > label > svg {
    fill: #fff; /* Set default color for SVG */
    transition: fill 0.3s ease; /* Add a transition effect */
    opacity: 0.3;
  }
  
  .${dom_id}_rating > input:checked + label:hover svg {
    fill: #e58e09;
    opacity: 1;
  }
  
  .${dom_id}_rating:not(:checked) > label:hover svg {
    fill: #ff9e0b;
    opacity: 1;
  }
  
  .${dom_id}_rating > input:checked + label > svg {
    fill: #fcea2b; /* Set color for selected stars */
    opacity: 1;
  }
  
  .${dom_id}_rating {
    display: flex;
    justify-content: ${sr_justify_content};
    align-items: center;
    flex-direction: row-reverse;
  }`;
  if (style.styleSheet) {
    // 针对 IE
    style.styleSheet.cssText = css;
  } else {
    // 其他浏览器
    style.appendChild(document.createTextNode(css));
  }
  document.head.appendChild(style);
  //添加图表标
  $(`#${dom_id}`).append(`<div class="${dom_id}_rating"></div>`);
  for (let i = fieldValue.length - 1; i > 0; i--) {
    let emoji_svg;
    switch (i) {
      case 1:
        emoji_svg = `<svg id="angry_face" viewBox="0 0 72 72" height="1.5em" class="emoji">
        <g id="color">
          <path d="M36,13c-12.6823,0-23,10.3177-23,23c0,12.6822,10.3177,23,23,23c12.6822,0,23-10.3178,23-23 C59,23.3177,48.6822,13,36,13z"/>
        </g>
        <g id="hair"/>
        <g id="skin"/>
        <g id="skin-shadow"/>
        <g id="line">
          <circle cx="36" cy="36" r="23" fill="none" stroke="#000000" stroke-miterlimit="10" stroke-width="2"/>
          <path fill="#000" d="M30,32.9252c0,1.6567-1.3448,3-3,3c-1.6553,0-3-1.3433-3-3c0-1.6553,1.3447-3,3-3C28.6552,29.9252,30,31.27,30,32.9252"/>
          <path fill="#000" d="M48,32.9252c0,1.6567-1.3447,3-3,3s-3-1.3433-3-3c0-1.6553,1.3447-3,3-3S48,31.27,48,32.9252"/>
          <line x1="23" x2="30" y1="24" y2="28" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"/>
          <line x1="49" x2="42" y1="24" y2="28" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"/>
          <path fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" d="M29.5,43c1.2841-0.6376,3.9847-1.0308,6.8421-0.9981c2.6235,0.03,4.9897,0.4146,6.1579,0.9981"/>
        </g>
      </svg>
      `;
        break;
      case 2:
        emoji_svg = `<svg id="frowning_face" viewBox="0 0 72 72" height="1.5em" class="emoji">
        <g id="color">
          <path d="M36,13c-12.6823,0-23,10.3177-23,23c0,12.6822,10.3177,23,23,23c12.6822,0,23-10.3178,23-23 C59,23.3177,48.6822,13,36,13z"/>
        </g>
        <g id="hair"/>
        <g id="skin"/>
        <g id="skin-shadow"/>
        <g id="line">
          <circle cx="36" cy="36" r="23" fill="none" stroke="#000000" stroke-miterlimit="10" stroke-width="2"/>
          <path fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" d="M26.5,48c1.8768-3.8326,5.8239-6.1965,10-6c3.8343,0.1804,7.2926,2.4926,9,6"/>
          <path fill="#000" d="M30,31c0,1.6568-1.3448,3-3,3c-1.6553,0-3-1.3433-3-3c0-1.6552,1.3447-3,3-3C28.6552,28,30,29.3448,30,31"/>
          <path fill="#000" d="M48,31c0,1.6568-1.3447,3-3,3s-3-1.3433-3-3c0-1.6552,1.3447-3,3-3S48,29.3448,48,31"/>
        </g>
      </svg>
      `;
        break;
      case 3:
        emoji_svg = `<svg id="neutral_face" viewBox="0 0 72 72" height="1.5em" class="emoji">
        <g id="color">
          <path d="M36,13c-12.6823,0-23,10.3177-23,23c0,12.6822,10.3177,23,23,23c12.6822,0,23-10.3178,23-23 C59,23.3177,48.6822,13,36,13z"/>
        </g>
        <g id="hair"/>
        <g id="skin"/>
        <g id="skin-shadow"/>
        <g id="line">
          <circle cx="36" cy="36" r="23" fill="none" stroke="#000000" stroke-miterlimit="10" stroke-width="2"/>
          <line x1="27" x2="45" y1="43" y2="43" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"/>
          <path fill="#000" d="M30,31c0,1.6568-1.3448,3-3,3c-1.6553,0-3-1.3433-3-3c0-1.6552,1.3447-3,3-3C28.6552,28,30,29.3448,30,31"/>
          <path fill="#000" d="M48,31c0,1.6568-1.3447,3-3,3s-3-1.3433-3-3c0-1.6552,1.3447-3,3-3S48,29.3448,48,31"/>
        </g>
      </svg>      
      `;
        break;
      case 4:
        emoji_svg = `<svg id="smiling_face" viewBox="0 0 72 72" height="1.5em" class="emoji">
        <g id="color">
          <circle cx="36.0001" cy="36" r="22.9999"/>
        </g>
        <g id="hair"/>
        <g id="skin"/>
        <g id="skin-shadow"/>
        <g id="line">
          <circle cx="36" cy="36" r="23" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
          <path fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M45.8147,45.2268a15.4294,15.4294,0,0,1-19.6294,0"/>
          <path fill="none" stroke="#000" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" d="M31.6941,33.4036a4.7262,4.7262,0,0,0-8.6382,0"/>
          <path fill="none" stroke="#000" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" d="M48.9441,33.4036a4.7262,4.7262,0,0,0-8.6382,0"/>
        </g>
      </svg>
      `;
        break;
      case 5:
        emoji_svg = `<svg id="beaming_face" viewBox="0 0 72 72" height="1.5em" class="emoji">
        <g id="color">
          <circle cx="36" cy="36" r="23"/>
          <path fill="#fff" d="M50.595,41.64a11.5554,11.5554,0,0,1-.87,4.49c-12.49,3.03-25.43.34-27.49-.13a11.4347,11.4347,0,0,1-.83-4.36h.11s14.8,3.59,28.89.07Z"/>
          <path fill="#fff" d="M49.7251,46.13c-1.79,4.27-6.35,7.23-13.69,7.23-7.41,0-12.03-3.03-13.8-7.36C24.2951,46.47,37.235,49.16,49.7251,46.13Z"/>
        </g>
        <g id="hair"/>
        <g id="skin"/>
        <g id="skin-shadow"/>
        <g id="line">
          <circle cx="36" cy="36" r="23" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
          <path fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M50.595,41.64a11.5554,11.5554,0,0,1-.87,4.49c-12.49,3.03-25.43.34-27.49-.13a11.4347,11.4347,0,0,1-.83-4.36h.11s14.8,3.59,28.89.07Z"/>
          <path fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M49.7251,46.13c-1.79,4.27-6.35,7.23-13.69,7.23-7.41,0-12.03-3.03-13.8-7.36C24.2951,46.47,37.235,49.16,49.7251,46.13Z"/>
          <path fill="none" stroke="#000" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" d="M31.6941,32.4036a4.7262,4.7262,0,0,0-8.6382,0"/>
          <path fill="none" stroke="#000" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" d="M48.9441,32.4036a4.7262,4.7262,0,0,0-8.6382,0"/>
        </g>
      </svg>
      `;
        break;
      default:
        emoji_svg = `<svg
        viewBox="0 0 576 512"
        height="1em"
        class="star-solid"
      >
        <path
          d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
        ></path></svg>
      `;
        break;
    }
    $(`.${dom_id}_rating`).append(`<input type="radio" id="${dom_id}_star${i}" data-checked=0 name="${dom_id}_rate" value="${i}" />
    <label for="${dom_id}_star${i}" title="${sr_text_arr[i]}"
      >${emoji_svg}</label>`);
  }
  let initial_num = WfForm.getFieldValue(fieldid);
  if (initial_num !== undefined && initial_num !== "") {
    for (let i = 0; i < fieldValue.length; i++) {
      if (fieldValue[i] == +initial_num) {
        if (i > 0) {
          $(`#${dom_id}_star${i}`).attr({ checked: true });
          if (sr_noChoose == 1) {
            $(`#${dom_id}_star${i}`)[0].setAttribute('data-checked', 1);
          }
        }
        break;
      }
    }
  }
  if (sr_noChoose == 1) {
    for (let i = 1; i < fieldValue.length; i++) {
      $(`#${dom_id}_star${i}`).click((event) => {
        if (event.target.getAttribute('data-checked') == 1) {
          event.target.checked = false;
          event.target.setAttribute('data-checked', 0);
          WfForm.changeFieldValue(fieldid, { value: fieldValue[0] });
        } else {
          fieldValue.forEach((e, index) => {
            if (index > 0 && index != i) {
              $(`#${dom_id}_star${index}`)[0].setAttribute('data-checked', 0);
            }
          });
          event.target.setAttribute('data-checked', 1);
          WfForm.changeFieldValue(fieldid, { value: fieldValue[i] });
        }
      });
    }
  } else {
    for (let i = 1; i < fieldValue.length; i++) {
      $(`#${dom_id}_star${i}`).click(() => {
        WfForm.changeFieldValue(fieldid, { value: fieldValue[i] });
      });
    }
  }
}