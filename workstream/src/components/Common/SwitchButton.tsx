import { useEffect, useState } from 'react';

interface SwitchButtonProps {
  value1: string;
  value2: string;
  defaultValue?: string;
  onButtonToggle: (buttonNumber: number) => void;
}

export const SwitchButton: React.FC<SwitchButtonProps> = props => {
  const [buttonOn, setButtonOn] = useState(false);

  useEffect(() => {
    setButtonOn(props.defaultValue === 'Y');
  }, [props.defaultValue, props.value1]);

  const buttonOnHandler = (buttonNumber: number) => {
    setButtonOn(buttonNumber === 1);
    props.onButtonToggle(buttonNumber);
  };

  return (
    <div className="switch-box-wrapper">
      <button className={buttonOn ? 'active' : ''} onClick={() => buttonOnHandler(1)}>
        {props.value1}
      </button>
      <button className={!buttonOn ? 'active' : ''} onClick={() => buttonOnHandler(2)}>
        {props.value2}
      </button>
    </div>
  );
};

export default SwitchButton;
