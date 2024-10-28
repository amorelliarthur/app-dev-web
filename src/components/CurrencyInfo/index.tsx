import { useEffect, useState } from "react";
import axios from "axios";
import { FaRegStar } from "react-icons/fa";
import styles from "@/components/CurrencyInfo/CurrencyInfo.module.css";

interface ExchangeRate {
    name: string;
    high: number;
    low: number;
    current: number;
}

interface CurrencyData {
    [key: string]: ExchangeRate;
}

const CurrencyInfo = (): React.ReactElement => {
    const [exchangeRates, setExchangeRates] = useState<CurrencyData>({});

    const fetchExchangeRates = async () => {
        try {
            const response = await axios.get('https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,GBP-BRL,ARS-BRL,COP-BRL,BTC-BRL,ETH-BRL,LTC-BRL,DOGE-BRL,XRP-BRL');
            const data = response.data;

            const rates: CurrencyData = {};
            for (const key in data) {
                const { name, high, low, bid } = data[key];
                rates[key] = {
                    name: name,
                    high: parseFloat(high),
                    low: parseFloat(low),
                    current: parseFloat(bid),
                };
            }
            setExchangeRates(rates);
        } catch (error) {
            console.error("Erro ao buscar cotações:", error);
        }
    };

    useEffect(() => {
        fetchExchangeRates(); // Chama a primeira vez
        const interval = setInterval(fetchExchangeRates, 30000); // Atualiza a cada 30 segundos
        return () => clearInterval(interval); // Limpa o intervalo ao desmontar o componente
    }, []);

    return (
        <div className={styles.infoBox}>
            {Object.keys(exchangeRates).map((key) => (
                <div key={key} className={styles.infoItem}>
                    <button className={styles.starButton}>
                        <FaRegStar  />
                    </button>
                    <h3>{exchangeRates[key].name}</h3>
                    <p>Maior valor: R$ {exchangeRates[key].high.toFixed(4)}</p>
                    <p>Menor valor: R$ {exchangeRates[key].low.toFixed(4)}</p>
                    <p>Valor atual: R$ {exchangeRates[key].current.toFixed(4)}</p>
                </div>
            ))}
        </div>
    );
};

export default CurrencyInfo;