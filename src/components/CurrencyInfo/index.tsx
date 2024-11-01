import { useEffect, useState } from "react";
import axios from "axios";
import { FaRegStar, FaStar } from "react-icons/fa";
import styles from "@/components/CurrencyInfo/CurrencyInfo.module.css";
import router from "next/router";

interface ExchangeRate {
    name: string;
    high: number;
    low: number;
    current: number;
}

interface CurrencyData {
    [key: string]: ExchangeRate;
}

interface FavoritedCoin {
    code: string;
    name: string;
}

const CurrencyInfo = (): React.ReactElement => {
    const [exchangeRates, setExchangeRates] = useState<CurrencyData>({});
    const [favoriteCoins, setFavoriteCoins] = useState<Set<string>>(new Set()); // Usa um Set para facilitar a verificação

    const fetchExchangeRates = async () => {
        try {
            const response = await axios.get('https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,GBP-BRL,ARS-BRL,COP-BRL,BTC-BRL,ETH-BRL,LTC-BRL,DOGE-BRL,XRP-BRL');
            const data = response.data;
            console.log(data)

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

    const fetchFavoriteCoins = async () => {
        const userId = localStorage.getItem("userId");

        if (!userId) {
            console.error("ID do usuário não encontrado! O usuário deve estar logado.");
            return;
        }

        try {
            const response = await axios.get(`http://localhost:3000/coins/user/${userId}`);
            const data: FavoritedCoin[] = response.data;

            const favorites = new Set(data.map((coin) => coin.code));
            setFavoriteCoins(favorites);
        } catch (error) {
            console.error("Erro ao buscar moedas favoritadas:", error);
        }
    };

    const handleFavorite = async (code: string, name: string) => {
        const token = localStorage.getItem("token");

        if (!token) {
            console.error("Token não encontrado! O usuário deve estar logado.");
            router.push("/login"); 
            return;
        }

        if (favoriteCoins.has(code)) {
            // Se já estiver favoritada, vamos desfavoritar
            await handleUnfavorite(code);
        } else {
            // Senão, vamos favoritar
            try {
                const response = await axios.post(
                    "http://localhost:3000/coins",
                    { code, name },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (response.status === 201) {
                    setFavoriteCoins((prevFavorites) => new Set(prevFavorites).add(code));
                    console.log("Moeda favoritada com sucesso!");
                } else {
                    console.error("Erro ao favoritar moeda.");
                }
            } catch (error) {
                console.error("Erro ao enviar a moeda como favorita:", error);
            }
        }
    };

    const handleUnfavorite = async (code: string) => {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");

        if (!token || !userId) {
            console.error("Token ou ID do usuário não encontrado!");
            return;
        }

        try {
            const response = await axios.delete(
                `http://localhost:3000/coins/${userId}/${code}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 200) {
                setFavoriteCoins((prevFavorites) => {
                    const updatedFavorites = new Set(prevFavorites);
                    updatedFavorites.delete(code);
                    return updatedFavorites;
                });
                console.log("Moeda desfavoritada com sucesso!");
            } else {
                console.error("Erro ao desfavoritar moeda.");
            }
        } catch (error) {
            console.error("Erro ao desfavoritar a moeda:", error);
        }
    };

    useEffect(() => {
        fetchExchangeRates();
        const token = localStorage.getItem("token");
        if (token) {
            fetchFavoriteCoins();
        }
        const interval = setInterval(fetchExchangeRates, 30000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className={styles.infoBox}>
            {Object.keys(exchangeRates)
                .sort((a, b) => {
                    const isAFavorite = favoriteCoins.has(a);
                    const isBFavorite = favoriteCoins.has(b);
    
                    // Se 'a' é favorita e 'b' não é, 'a' deve vir antes
                    if (isAFavorite && !isBFavorite) return -1;
                    // Se 'b' é favorita e 'a' não é, 'b' deve vir antes
                    if (!isAFavorite && isBFavorite) return 1;
                    // Se ambos são favoritos ou ambos não são, não muda a ordem
                    return 0;
                })
                .map((key) => (
                    <div key={key} className={styles.infoItem}>
                        <button 
                            className={styles.starButton}
                            onClick={() => handleFavorite(key, exchangeRates[key].name)}
                        >
                            {localStorage.getItem("token") && favoriteCoins.has(key) ? (
                                <FaStar color="darkorange" />
                            ) : (
                                <FaRegStar />
                            )}
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
