import Button from './Button'
import './Keyboard.css'

export default function Keyboard() {
  return (
    <div className="keyboard">
      <div className="grid">
        <Button
          colored
          size="regular"
          data={{ label: 'C' }}
          onClick={() => undefined}
        />
        <Button size="regular" data={{ label: '+/−' }} onClick={console.log} />
        <Button size="regular" data={{ label: '%' }} onClick={console.log} />
        <Button size="regular" data={{ label: '÷' }} onClick={console.log} />
        <Button
          size="regular"
          data={{ value: '7', label: '7' }}
          onClick={console.log}
        />
        <Button
          size="regular"
          data={{ value: '8', label: '8' }}
          onClick={console.log}
        />
        <Button
          size="regular"
          data={{ value: '9', label: '9' }}
          onClick={console.log}
        />
        <Button size="regular" data={{ label: '×' }} onClick={console.log} />
        <Button
          size="regular"
          data={{ value: '4', label: '4' }}
          onClick={console.log}
        />
        <Button
          size="regular"
          data={{ value: '5', label: '5' }}
          onClick={console.log}
        />
        <Button
          size="regular"
          data={{ value: '6', label: '6' }}
          onClick={console.log}
        />
        <Button size="regular" data={{ label: '−' }} onClick={console.log} />
        <Button
          size="regular"
          data={{ value: '1', label: '1' }}
          onClick={console.log}
        />
        <Button
          size="regular"
          data={{ value: '2', label: '2' }}
          onClick={console.log}
        />
        <Button
          size="regular"
          data={{ value: '3', label: '3' }}
          onClick={console.log}
        />
        <Button size="big" data={{ label: '+' }} onClick={console.log} />
        <Button
          size="regular"
          data={{ value: '0', label: '0' }}
          onClick={console.log}
        />
        <Button size="regular" data={{ label: '.' }} onClick={console.log} />
        <Button size="regular" data={{ label: '=' }} onClick={console.log} />
      </div>
    </div>
  )
}
