import React, { useCallback, useEffect, useState } from 'react';
import './Form.css';
import { useTelegram } from '../../hooks/useTelegram';

const Form = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [position, setPosition] = useState('');
    const [language, setLanguage] = useState('level-a1');
    const {tg} = useTelegram();
    const onChangeName = (e) => {
        setName(e.target.value)
    }
    const onChangeEmail = (e) => {
        setEmail(e.target.value)
    }
    const onChangePosition = (e) => {
        setPosition(e.target.value)
    }
    const onChangeLanguage = (e) => {
        setLanguage(e.target.value)
    }

    const onSendData = useCallback(() => {
        const data = {
            name,
            email,
            language,
            position,
        }
        tg.sendData(JSON.stringify(data));
    }, [name, email, language, position]);
    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData);
        return () => {
            tg.offEvent('mainButtonClicked', onSendData);
        }
    }, [onSendData]);
    useEffect(() => {
        tg.MainButton.setParams({
            text: 'Отправить данные'
        })
    }, []);

    useEffect(() => {
        if (!name || !email || !position) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
        }
    }, [name, email, position]);
  return (
    <div className={"form"}>
        <h3>Введите ваши данные</h3>
        <input 
            className={'input'} 
            type="text" 
            placeholder={'Имя'} 
            value={name} 
            onChange={onChangeName} 
        />
        <input 
            className={'input'} 
            type="text" 
            placeholder={'Email'}
            value={email} 
            onChange={onChangeEmail}
        />
        <h3 className='text-headers'>Желаемая позиция </h3>
        <input 
            className={'input'} 
            type="text" 
            placeholder={'Позиция'}
            value={position} 
            onChange={onChangePosition}
        />
        <h3 className='text-headers'>Уровень английского </h3>
        <select className={'select'} value={language} 
            onChange={onChangeLanguage}>
            <option value="level-a1" >A1</option>
            <option value="level-a2" >A2</option>
            <option value="level-b1" >B1</option>
            <option value="level-b2" >B2</option>
            <option value="level-c1" >C1</option>
            <option value="level-c2" >C2</option>
        </select>
    </div>
  )
}

export default Form