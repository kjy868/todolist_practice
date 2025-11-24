import { useEffect, useState } from 'react'
// import './App.css'

const Timer = () => {
    useEffect(() => {
        const timer = setInterval(() => {
            console.log("타이머 돌아가는중 ing...")
        }, 1000);

        return () => {
            clearInterval(timer);
            console.log('타이머종료????')
        }
    });

    return (
        <>
            <p>타이머 시작</p>
        </>
    )
}


function UseEffect() {

    // useEffect
    // 1. 화면이 렌더링 될 때마다 매번 실행됨.
    // useEffect(() => {
    //     console.log('헬로');
    // });

    // 2. 리스트 추가될 때만 실행
    // useEffect(() => {
    //     console.log('리스트 추가됨');
    // }, [todos]);

    // 3. 첫 렌더링 되었을 때만 실행할 때
    // useEffect(() => {
    //     console.log('처음만 실행');
    // }, []);

    const [showTimer, setShowTimer] = useState(false);

    return (

        <>
            {/* showTimer가 true일 때만 <Timer/>를 보여줌 */}
            {showTimer && <Timer />}
            <button onClick={() => setShowTimer(!showTimer)}>토글버튼</button >
        </>
    )
}

export default UseEffect