import Button from './Button'
import './Keyboard.css'

export default function Keyboard() {
  return (
    <div className="keyboard">
      <div className="grid">
        <Button size="regular" type="reset" value="C" />
        <Button size="regular" type="symbol" value="+/-" />
        <Button size="regular" type="operator" value="%" />
        <Button size="regular" type="operator" value="/" />
        <Button size="regular" type="number" value="7" />
        <Button size="regular" type="number" value="8" />
        <Button size="regular" type="number" value="9" />
        <Button size="regular" type="operator" value="*" />
        <Button size="regular" type="number" value="4" />
        <Button size="regular" type="number" value="5" />
        <Button size="regular" type="number" value="6" />
        <Button size="regular" type="operator" value="-" />
        <Button size="regular" type="number" value="1" />
        <Button size="regular" type="number" value="2" />
        <Button size="regular" type="number" value="3" />
        <Button size="big" type="operator" value="+" />
        <Button size="regular" type="number" value="0" />
        <Button size="regular" type="symbol" value="." />
        <Button size="regular" type="operator" value="=" />
      </div>
    </div>
  )
}
