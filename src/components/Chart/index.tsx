import { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from "chart.js";
import styles from "@/components/Chart/Chart.module.css";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

interface ApiResponseEntry {
    timestamp: number;
    bid: string; // A cotação retornada como string
}

interface ChartDataset {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
    fill: boolean;
}

interface ChartData {
    labels: string[];
    datasets: ChartDataset[];
}

const Chart = (): React.ReactElement => {
    const [data, setData] = useState<ChartData>({ labels: [], datasets: [] });

    const fetchData = async () => {
        try {
            const response = await axios.get<ApiResponseEntry[]>('https://economia.awesomeapi.com.br/json/daily/USD-BRL/30'); // 30 dias
            const chartData = response.data.map((entry) => ({
                date: new Date(entry.timestamp * 1000).toLocaleDateString("pt-BR"),
                value: parseFloat(entry.bid)
            })).reverse();

            setData({
                labels: chartData.map(item => item.date),
                datasets: [{
                    label: "USD/BRL",
                    data: chartData.map(item => item.value),
                    borderColor: "rgba(75, 192, 192, 1)",
                    backgroundColor: "rgba(75, 192, 192, 0.2)",
                    fill: true,
                }]
            });
        } catch (error) {
            console.error("Erro ao buscar dados:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className={styles.chartBox}>
            <Line 
                data={data} 
                options={{ 
                    responsive: true, 
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            labels: {
                                color: '#FFFFFF',
                            },
                        },
                        title: {
                            display: true,
                            text: 'Cotação USD/BRL - Últimos 30 Dias',
                            color: '#FFFFFF',
                            font: {
                                size: 18
                            }
                        }
                    },
                    scales: {
                        x: {
                            ticks: {
                                color: '#FFFFFF',
                            }
                        },
                        y: {
                            ticks: {
                                color: '#FFFFFF',
                            }
                        }
                    }
                }}
            />

        </div>
    );
};

export default Chart;
