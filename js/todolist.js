function render() {
    const local = getLocal()
    if (local) {
        let ingstr = ''
        let edstr = ''
        let ing = 0
        let ed = 0
        $.each(local, function(i, e) {
            if (e.done) {
                edstr += `<li>
                <input type="checkbox" name="" checked>
                <span>${e.title}</span>
                <a href="javascript:" data-id=${i}>X</a>
                </li>
            `
                ed++
            } else {
                ingstr += `<li>
                <input type="checkbox" name="">
                <span>${e.title}</span>
                <a href="javascript:" data-id=${i}>X</a>
                </li>
            `
                ing++
            }
        })
        $('.ing').html(ingstr)
        $('.ed').html(edstr)
        $('.ingtitle span').eq(1).text(ing)
        $('.edtitle span').eq(1).text(ed)
    }
}
if (getLocal()) {
    render()
}
$('header > input').on('keyup', function(e) {
    if (e.keyCode === 13) {
        if (!this.value.trim()) {
            return alert('请输入您要做的事')
        }
        let local = getLocal()
        local.push({
            title: this.value,
            done: false,
        })
        saveLocal(local)
        this.value = ''
    }
    render()
})
$('ul').on('click', 'a', function() {
    let local = getLocal()
    const index = $(this).attr('data-id')
    local.splice(index, 1)
    saveLocal(local)
    render()
})
$('ul').on('click', 'input', function() {
    let local = getLocal()
    const index = $(this).siblings('a').attr('data-id')
    local[index].done = this.checked
    saveLocal(local)
    render()
})

function getLocal() {
    let data = localStorage.getItem('todo')
    if (data) {
        return JSON.parse(data)
    }
    return []
}

function saveLocal(local) {
    localStorage.setItem('todo', JSON.stringify(local))
}