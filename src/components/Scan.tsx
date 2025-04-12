'use client'
import { Html5QrcodeScanner } from 'html5-qrcode'
import { JSX, useEffect, useState } from 'react'
import styled from 'styled-components'

export const Scan = (): JSX.Element => {
    const [scanResult, setScanResult] = useState<null | string>(null)
    const [reset, setReset] = useState(false)

    useEffect(() => {
        const scanner = new Html5QrcodeScanner(
            'reader',
            {
                qrbox: {
                    width: 250,
                    height: 250
                },
                fps: 5
            },
            false
        )
        const sound = new Audio('/audios/barcode.wav')

        function success(result: string): void {
            scanner.clear()
            setScanResult(result)
            sound.play()
        }

        function error(err: string): void {
            console.warn(err)
            scanner.resume()
            scanner.clear()
        }

        scanner.render(success, error)
        
        return () => {
            scanner.clear()
        }
    }, [reset])  
    
    function back(): void {
        setScanResult(null)
        setReset(!reset)
    }
    if (scanResult) {
        return (
            <div className="w-screen md:w-full flex flex-col items-center justify-center">
                <h2>Succcess: {scanResult}</h2>
                <span>{scanResult}</span>
                <button className='px-4 py-2 bg-blue-500' onClick={back}>VOLTAR</button>
            </div>
        )
    }

    return (
        <StyledDiv>
            <div className="w-full" id="reader"></div>
        </StyledDiv>
    )
}

const StyledDiv = styled.div`
    display: flex;
    justify-content: center;
    border: 4px solid #000;

    #html5-qrcode-button-camera-permission {
        background-color: #0b8ec2;
        color: #fff;
        padding: 4px 8px;
        cursor: pointer;
    }
    #reader__dashboard_section_csr {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    #html5-qrcode-button-camera-stop,
    #html5-qrcode-button-camera-start {
        background-color: #0b8ec2;
        color: #fff;
        padding: 4px 8px;
        cursor: pointer;
        margin-top: 4px;
        margin-bottom: 4px;
    }
`
