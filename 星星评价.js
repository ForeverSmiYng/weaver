/*
dom_id为字符串，表示单元格元素id，必填
fieldid为字符串，表示字段id，可把打星结果存入对应字段，必填
fieldValue为数组，表示每颗星对应的字段值，数组第0个值为0颗星的value，第1个值为第1个星的value，必填
noChoose为数字，表示是否允许取消选择，1表示允许，非1表示不允许，默认不允许，非必填
text_arr为数组，表示每颗星的备注，数组第0个值为0颗星的备注，实际无作用，第1个值为第1个星的备注，默认备注为“1星、2星”，非必填
size为数字，表示星星的大小，单位为px
justify_content为字符串，表示星星的横向布局，默认为“left”靠左，一般可选“right”和“center”
*/
function starRating(dom_id, fieldid, fieldValue, noChoose, text_arr, size, justify_content) {
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
    fill: #666;
  }
  
  .${dom_id}_rating:not(:checked) > label > svg {
    fill: #666; /* Set default color for SVG */
    transition: fill 0.3s ease; /* Add a transition effect */
  }
  
  .${dom_id}_rating > input:checked + label:hover svg,
  .${dom_id}_rating > input:checked + label:hover ~ label svg,
  .${dom_id}_rating > input:checked ~ label:hover svg,
  .${dom_id}_rating > input:checked ~ label:hover ~ label svg,
  .${dom_id}_rating > label:hover ~ input:checked ~ label svg {
    fill: #e58e09;
  }
  
  .${dom_id}_rating:not(:checked) > label:hover svg,
  .${dom_id}_rating:not(:checked) > label:hover ~ label svg {
    fill: #ff9e0b;
  }
  
  .${dom_id}_rating > input:checked ~ label > svg {
    fill: #ffa723; /* Set color for selected stars */
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
    $(`.${dom_id}_rating`).append(`<input type="radio" id="${dom_id}_star${i}" data-checked=0 name="${dom_id}_rate" value="${i}" />
    <label for="${dom_id}_star${i}" title="${sr_text_arr[i]}"
      ><svg
        viewBox="0 0 576 512"
        height="1em"
        class="star-solid"
      >
        <path
          d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
        ></path></svg
    ></label>`);
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