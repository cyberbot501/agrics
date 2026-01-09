import { useEffect, useState } from 'react';
import { Calendar, Cloud, CloudRain, Sun, Wind, Droplets, Bot } from 'lucide-react';
import { askFarmingAssistant } from '../lib/ai';
import farmBg from "../assets/calendar.png";

interface WeatherData {
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  rainfall: string;
}

export default function FarmingCalendar() {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [weatherError, setWeatherError] = useState<string | null>(null);
  const [aiQuery, setAiQuery] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [calendarText, setCalendarText] = useState('');
  const [calendarLoading, setCalendarLoading] = useState(false);
  const [calendarError, setCalendarError] = useState<string | null>(null);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  useEffect(() => {
    fetchWeatherData();
  }, []);

  useEffect(() => {
    generateCalendarForMonth(selectedMonth);
  }, [selectedMonth]);

  const fetchWeatherData = async () => {
    try {
      setWeatherLoading(true);
      setWeatherError(null);

      // Abuja, Nigeria as a central reference point
      const url =
        'https://api.open-meteo.com/v1/forecast?' +
        'latitude=9.0765&longitude=7.3986&current_weather=true&' +
        'hourly=temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m&' +
        'timezone=Africa%2FLagos';

      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`Weather API error: ${res.status}`);
      }

      const data = await res.json() as {
        current_weather?: {
          temperature?: number;
          windspeed?: number;
          weathercode?: number;
        };
        hourly?: {
          time?: string[];
          temperature_2m?: number[];
          relative_humidity_2m?: number[];
          precipitation?: number[];
          wind_speed_10m?: number[];
        };
      };

      const current = data.current_weather;
      const hourly = data.hourly;

      const temperature = current?.temperature ?? hourly?.temperature_2m?.[0] ?? 28;
      const windSpeed = current?.windspeed ?? hourly?.wind_speed_10m?.[0] ?? 10;
      const humidity = hourly?.relative_humidity_2m?.[0] ?? 70;
      const recentPrecip =
        hourly?.precipitation && hourly.precipitation.length
          ? hourly.precipitation[0]
          : 0;

      let rainfall: string;
      if (recentPrecip === 0) rainfall = 'None';
      else if (recentPrecip < 2) rainfall = 'Light';
      else if (recentPrecip < 10) rainfall = 'Moderate';
      else rainfall = 'Heavy';

      const weatherCode = current?.weathercode ?? 0;
      let condition = 'Clear';
      if (weatherCode === 0) condition = 'Clear Sky';
      else if ([1, 2, 3].includes(weatherCode)) condition = 'Partly Cloudy';
      else if ([45, 48].includes(weatherCode)) condition = 'Foggy';
      else if ([51, 53, 55, 61, 63, 65].includes(weatherCode)) condition = 'Rainy';
      else if ([71, 73, 75].includes(weatherCode)) condition = 'Snow';
      else if ([80, 81, 82].includes(weatherCode)) condition = 'Showers';
      else if ([95, 96, 99].includes(weatherCode)) condition = 'Thunderstorm';

      const mapped: WeatherData = {
        temperature,
        condition,
        humidity,
        windSpeed,
        rainfall,
      };

      setWeatherData(mapped);
    } catch (error) {
      console.error('Failed to fetch weather data:', error);
      setWeatherError('Unable to load live weather data right now.');
      // Fallback to a reasonable default so UI still shows something
      setWeatherData({
        temperature: 28,
        condition: 'Partly Cloudy',
        humidity: 75,
        windSpeed: 12,
        rainfall: 'Moderate',
      });
    } finally {
      setWeatherLoading(false);
    }
  };

  const cleanMarkdown = (text: string): string => {
    return text
      .replace(/#{1,6}\s+/g, '') // Remove markdown headers (#, ##, ###, etc.)
      .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold (**text**)
      .replace(/\*(.*?)\*/g, '$1') // Remove italic (*text*)
      .replace(/`(.*?)`/g, '$1') // Remove code backticks
      .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Remove markdown links, keep text
      .replace(/---+/g, '') // Remove horizontal rules
      .replace(/^\s*[-*+]\s+/gm, '• ') // Convert markdown bullets to plain bullets
      .replace(/^\s*\d+\.\s+/gm, '') // Remove numbered list markers
      .replace(/\n{3,}/g, '\n\n') // Remove excessive line breaks
      .trim();
  };

  const handleAiQuery = async () => {
    if (!aiQuery.trim()) return;

    setAiLoading(true);
    setAiResponse('');

    try {
      const response = await askFarmingAssistant(aiQuery);
      setAiResponse(cleanMarkdown(response));
    } catch (error) {
      console.error('AI error:', error);
      setAiResponse(
        'Sorry, something went wrong while contacting the AI assistant. Please try again.'
      );
    } finally {
      setAiLoading(false);
    }
  };

  const generateCalendarForMonth = async (monthNumber: number) => {
    const monthName = months[monthNumber - 1];
    setCalendarLoading(true);
    setCalendarError(null);
    setCalendarText('');

    const prompt = `You are an expert Nigerian agricultural extension officer.
For ${monthName} in Nigeria, give a clear farming calendar in bullet points.
Group activities by major crop categories (e.g. Maize, Rice, Cassava, Vegetables, Livestock, Poultry).
For each category, list 3–6 key activities farmers should do in ${monthName}
(land preparation, planting, weeding, fertiliser, pest control, harvesting, storage, etc.).
Keep it concise and practical, using simple language.
IMPORTANT: Do NOT use any markdown formatting like #, ##, **, or *. Use plain text only.`;

    try {
      const text = await askFarmingAssistant(prompt);
      setCalendarText(cleanMarkdown(text));
    } catch (error) {
      console.error('Calendar AI error:', error);
      setCalendarError('Unable to generate the farming calendar right now. Please try again.');
    } finally {
      setCalendarLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-16">
      <section  style={{
    backgroundImage: `url(${farmBg})`,
  }}
  className="relative bg-cover bg-center opacity-80 bg-no-repeat text-black py-20"
>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Farming Calendar</h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto leading-relaxed">
              Nigeria's comprehensive farming schedule with weather insights
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 border-2 border-blue-200">
              <div className="flex items-center space-x-3 mb-6">
                <Cloud className="h-8 w-8 text-blue-600" />
                <h2 className="text-3xl font-bold text-gray-900">Weather Forecast</h2>
              </div>

              {weatherLoading && (
                <div className="flex justify-center items-center py-8">
                  <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-600 border-t-transparent" />
                </div>
              )}

              {!weatherLoading && weatherError && (
                <p className="text-sm text-red-600 mb-4">{weatherError}</p>
              )}

              {weatherData && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white rounded-xl p-4 shadow-md">
                      <div className="flex items-center space-x-2 mb-2">
                        <Sun className="h-5 w-5 text-orange-500" />
                        <span className="text-sm text-gray-600">Temperature</span>
                      </div>
                      <p className="text-3xl font-bold text-gray-900">{weatherData.temperature}°C</p>
                    </div>

                    <div className="bg-white rounded-xl p-4 shadow-md">
                      <div className="flex items-center space-x-2 mb-2">
                        <CloudRain className="h-5 w-5 text-blue-500" />
                        <span className="text-sm text-gray-600">Condition</span>
                      </div>
                      <p className="text-lg font-bold text-gray-900">{weatherData.condition}</p>
                    </div>

                    <div className="bg-white rounded-xl p-4 shadow-md">
                      <div className="flex items-center space-x-2 mb-2">
                        <Droplets className="h-5 w-5 text-cyan-500" />
                        <span className="text-sm text-gray-600">Humidity</span>
                      </div>
                      <p className="text-3xl font-bold text-gray-900">{weatherData.humidity}%</p>
                    </div>

                    <div className="bg-white rounded-xl p-4 shadow-md">
                      <div className="flex items-center space-x-2 mb-2">
                        <Wind className="h-5 w-5 text-gray-500" />
                        <span className="text-sm text-gray-600">Wind Speed</span>
                      </div>
                      <p className="text-3xl font-bold text-gray-900">{weatherData.windSpeed} km/h</p>
                    </div>
                  </div>

                  <div className="mt-6 bg-white rounded-xl p-4 shadow-md">
                    <p className="text-sm text-gray-600 mb-1">Rainfall Status</p>
                    <p className="text-2xl font-bold text-blue-600">{weatherData.rainfall}</p>
                  </div>
                </>
              )}
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border-2 border-purple-200">
              <div className="flex items-center space-x-3 mb-6">
                <Bot className="h-8 w-8 text-purple-600" />
                <h2 className="text-3xl font-bold text-gray-900">AI Farming Assistant</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <textarea
                    value={aiQuery}
                    onChange={(e) => setAiQuery(e.target.value)}
                    placeholder="Ask me anything about farming... e.g., 'How do I plant maize?' or 'When is the best time for rice?'"
                    className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:outline-none resize-none h-32"
                  />
                </div>

                <button
                  onClick={handleAiQuery}
                  disabled={aiLoading || !aiQuery.trim()}
                  className="w-full bg-purple-600 text-white px-6 py-3 rounded-xl hover:bg-purple-700 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed font-semibold"
                >
                  {aiLoading ? 'Analyzing...' : 'Get AI Advice'}
                </button>

                {aiResponse && (
                  <div className="bg-white rounded-xl p-4 shadow-md border-2 border-purple-200">
                    <p className="text-gray-800 leading-relaxed">{aiResponse}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gradient-to-br from-gray-50 to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center space-x-3 mb-8">
            <Calendar className="h-8 w-8 text-green-600" />
            <h2 className="text-4xl font-bold text-gray-900">Monthly Farming Activities</h2>
          </div>

          <div className="mb-8 overflow-x-auto">
            <div className="flex space-x-2 pb-4 min-w-max">
              {months.map((month, index) => (
                <button
                  key={month}
                  onClick={() => setSelectedMonth(index + 1)}
                  className={`px-6 py-3 rounded-xl font-semibold whitespace-nowrap transition-all ${
                    selectedMonth === index + 1
                      ? 'bg-green-600 text-white shadow-lg scale-105'
                      : 'bg-white text-gray-700 hover:bg-gray-100 shadow'
                  }`}
                >
                  {month}
                </button>
              ))}
            </div>
          </div>

          {calendarLoading && (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-green-600 border-t-transparent"></div>
            </div>
          )}

          {!calendarLoading && calendarError && (
            <div className="text-center py-20 bg-white rounded-2xl shadow-lg">
              <p className="text-2xl text-red-600">{calendarError}</p>
            </div>
          )}

          {!calendarLoading && !calendarError && calendarText && (
            <div className="bg-white rounded-2xl shadow-lg border-2 border-green-100 p-6 md:p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Farming Calendar for {months[selectedMonth - 1]} (Nigeria)
              </h3>
              <div className="prose max-w-none text-gray-800 whitespace-pre-line">
                {calendarText}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
