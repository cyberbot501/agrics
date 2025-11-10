import { useEffect, useState } from 'react';
import { Calendar, Cloud, CloudRain, Sun, Wind, Droplets, Bot } from 'lucide-react';
import { supabase, FarmingCalendar as FarmingCalendarType } from '../lib/supabase';
import farmBg from "../assets/calendar.png";

export default function FarmingCalendar() {
  const [calendarData, setCalendarData] = useState<FarmingCalendarType[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [weatherData, setWeatherData] = useState({
    temperature: 28,
    condition: 'Partly Cloudy',
    humidity: 75,
    windSpeed: 12,
    rainfall: 'Moderate',
  });
  const [aiQuery, setAiQuery] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [aiLoading, setAiLoading] = useState(false);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  useEffect(() => {
    fetchCalendarData();
    simulateWeatherUpdate();
  }, []);

  const fetchCalendarData = async () => {
    try {
      const { data, error } = await supabase
        .from('farming_calendar')
        .select('*')
        .order('month', { ascending: true })
        .order('crop_name', { ascending: true });

      if (error) throw error;
      setCalendarData(data || []);
    } catch (error) {
      console.error('Error fetching calendar:', error);
    } finally {
      setLoading(false);
    }
  };

  const simulateWeatherUpdate = () => {
    const currentMonth = new Date().getMonth() + 1;
    const isRainySeason = currentMonth >= 4 && currentMonth <= 10;

    setWeatherData({
      temperature: isRainySeason ? 26 : 30,
      condition: isRainySeason ? 'Rainy' : 'Sunny',
      humidity: isRainySeason ? 85 : 65,
      windSpeed: isRainySeason ? 15 : 10,
      rainfall: isRainySeason ? 'Heavy' : 'Light',
    });
  };

  const handleAiQuery = async () => {
    if (!aiQuery.trim()) return;

    setAiLoading(true);
    setAiResponse('');

    setTimeout(() => {
      const responses: { [key: string]: string } = {
        'maize': 'For maize farming in Nigeria: Plant at the beginning of the rainy season (April-May). Use improved varieties like Oba Super 2. Apply NPK fertilizer at 3-4 weeks after planting. Weed regularly and harvest when cobs are mature (90-110 days).',
        'rice': 'Rice cultivation tips: Prepare land during dry season. Plant during early rains (April-June). Maintain 5-10cm water level for lowland rice. Apply fertilizer in splits. Control weeds early. Harvest when 80% of grains turn golden.',
        'cassava': 'Cassava farming guide: Plant during early rains (March-April). Use disease-free stems. Space 1m x 1m. Weed at 1 and 3 months. Cassava is drought-tolerant. Harvest at 10-12 months for best yields.',
        'weather': 'Current Nigerian farming seasons: Rainy season (April-October) is ideal for planting most crops. Dry season (November-March) is good for irrigation farming and harvesting. Plan accordingly for best yields.',
        'fertilizer': 'Fertilizer application tips: Use NPK 15:15:15 for most crops. Apply at planting and top-dress at 3-4 weeks. Organic manure improves soil structure. Conduct soil tests for best results.',
        'default': 'I can help with farming advice! Ask me about crop planting times, best practices for specific crops (maize, rice, cassava, yam), weather patterns, fertilizer application, pest control, or general farming tips for Nigeria.',
      };

      const query = aiQuery.toLowerCase();
      let response = responses.default;

      for (const [key, value] of Object.entries(responses)) {
        if (query.includes(key)) {
          response = value;
          break;
        }
      }

      setAiResponse(response);
      setAiLoading(false);
    }, 1500);
  };

  const filteredData = calendarData.filter(item => item.month === selectedMonth);

  const groupedData = filteredData.reduce((acc, item) => {
    if (!acc[item.crop_name]) {
      acc[item.crop_name] = [];
    }
    acc[item.crop_name].push(item);
    return acc;
  }, {} as { [key: string]: FarmingCalendarType[] });

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

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-green-600 border-t-transparent"></div>
            </div>
          ) : Object.keys(groupedData).length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl shadow-lg">
              <p className="text-2xl text-gray-600">No activities scheduled for {months[selectedMonth - 1]}</p>
            </div>
          ) : (
            <div className="grid gap-6">
              {Object.entries(groupedData).map(([cropName, activities]) => (
                <div
                  key={cropName}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-green-100 hover:shadow-2xl transition-shadow"
                >
                  <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-4">
                    <h3 className="text-2xl font-bold">{cropName}</h3>
                    <p className="text-sm opacity-90">{activities[0].season}</p>
                  </div>

                  <div className="p-6 space-y-4">
                    {activities.map((activity) => (
                      <div
                        key={activity.id}
                        className="flex items-start space-x-4 p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl"
                      >
                        <div className="w-3 h-3 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                        <div className="flex-1">
                          <h4 className="text-xl font-bold text-gray-900 mb-2">
                            {activity.activity}
                          </h4>
                          <p className="text-gray-600 leading-relaxed">
                            {activity.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
