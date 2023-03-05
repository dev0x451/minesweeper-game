import './Digits.css'
import Digit from './Digit'
function Digits({ digits }) {
  function split(num) {
    const tmp = []
    while (num > 0) {
      let digit = num % 10
      tmp.push(digit)
      num = Math.floor(num / 10)
    }
    return tmp
  }

  const renderedDigits = split(digits)

  return (
    <div className="digits">
      <Digit digit={renderedDigits[2] || 0} />
      <Digit digit={renderedDigits[1] || 0} />
      <Digit digit={renderedDigits[0] || 0} />
    </div>
  )
}

export default Digits
