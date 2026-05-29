const items = document.querySelectorAll('.item')
const groups = document.querySelectorAll('.group')

let draggingEl = null

// 拖曳開始
items.forEach(item=>{

  item.addEventListener('dragstart',()=>{

    draggingEl = item

    item.classList.add('dragging')

  })

  item.addEventListener('dragend',()=>{

    item.classList.remove('dragging')

    draggingEl = null

  })

})


// 每個父容器都能接收拖曳
groups.forEach(group=>{

  group.addEventListener('dragover',(e)=>{

    e.preventDefault()

    // 找出目前最接近的位置
    const afterElement = getDragAfterElement(group,e.clientX)

    if(afterElement == null){

      // 插到底部
      group.appendChild(draggingEl)

    }else{

      // 插到指定元素前面
      group.insertBefore(draggingEl,afterElement)

    }

  })

})



// 判斷應該插入哪個元素前
function getDragAfterElement(container,x){

  // 排除自己
  const elements = [...container.querySelectorAll('.item:not(.dragging)')]

  let closest = null
  let closestOffset = Number.NEGATIVE_INFINITY

  elements.forEach(el=>{

    const box = el.getBoundingClientRect()

    // 滑鼠距離元素中心點
    const offset = x - box.left - box.width / 2

    // offset < 0 代表滑鼠在元素上半部
    // 找最接近中心點的元素
    if(offset < 0 && offset > closestOffset){

      closestOffset = offset
      closest = el

    }

  })

  return closest

}