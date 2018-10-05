;(function() {
  function calculate({ amount, days, interest }) {
    const result = ((amount * interest) / 365) * days
    return { errors: {}, result }
  }

  function onInput(event) {
    return event.target
  }

  function update(model, target) {
    const values = Object.assign({}, model.values, {
      [target.id]: target.value
    })

    const { errors, result } = calculate(values)
    return Object.assign({}, model, { values, errors, result })
  }

  function init(signal, model) {
    document.querySelectorAll('.form_input').forEach(function(input) {
      input.addEventListener('input', signal(onInput))
    })
    view(signal, model)
  }

  function view(signal, { values, result }) {
    for (let key in values) {
      document.getElementById(key).value = values[key]
    }

    document.getElementById('result').textContent =
      Math.floor(result * 100) / 100
  }

  function mount(model, view) {
    const signal = action => event => {
      model = update(model, action(event))
      view(signal, model)
    }
    init(signal, model)
  }

  const initialValues = { amount: 100, days: 60, interest: 0.875 }

  const initalState = {
    values: initialValues,
    result: calculate(initialValues).result
  }

  mount(initalState, view)
})()
