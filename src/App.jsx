import { useState, useEffect, useRef } from 'react';

const SATS_PER_BTC = 100_000_000;
const PRICE_REFRESH_INTERVAL = 60_000; // Refresh every 60 seconds

// Quick amount presets
const QUICK_AMOUNTS = [100, 500, 1000, 5000, 10000, 50000];

// Currency options for multi-currency support (CoinGecko supports these)
const CURRENCIES = [
  { code: 'usd', symbol: '$', name: 'USD', flag: '🇺🇸' },
  { code: 'eur', symbol: '€', name: 'EUR', flag: '🇪🇺' },
  { code: 'gbp', symbol: '£', name: 'GBP', flag: '🇬🇧' },
];

// Historical price endpoint (CoinGecko free API)
const HISTORICAL_API = '/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=1';

function App() {
  // Price state
  const [btcPriceUSD, setBtcPriceUSD] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Currency selection (Feature #6: Multi-currency)
  const [selectedCurrency, setSelectedCurrency] = useState(CURRENCIES[0]);
  const [currentPriceLocal, setCurrentPriceLocal] = useState(0);

  // Calculator state
  const [activeMode, setActiveMode] = useState('usd'); // 'usd', 'btc', or 'sats'
  const [localCurrencySymbol, setLocalCurrencySymbol] = useState('$');

  // USD input values (always in cents to avoid floating point issues)
  const [usdCents, setUsdCents] = useState(0);
  const [btcSatoshi, setBtcSatoshi] = useState(0);
  const [inputValue, setInputValue] = useState('');

  // Feature #1: Quick amount buttons state (hidden until USD mode has a value)
  const [showQuickAmounts, setShowQuickAmounts] = useState(true);

  // Feature #3: Price alerts state
  const [alerts, setAlerts] = useState([]);
  const [newAlertPrice, setNewAlertPrice] = useState('');
  const [alertDirection, setAlertDirection] = useState('above'); // 'above' or 'below'

  // Feature #4: Portfolio tracker state (persisted to localStorage)
  const [portfolioBtc, setPortfolioBtc] = useState(() => {
    try {
      return localStorage.getItem('satsPortfolioBtc') || '';
    } catch {
      return '';
    }
  });
  const [showPortfolio, setShowPortfolio] = useState(false);

  // Feature #8: Share card state
  const [shareData, setShareData] = useState(null);

  // Ref for input to focus/blur
  const inputRef = useRef(null);

  // Persist portfolio BTC to localStorage whenever it changes
  useEffect(() => {
    try {
      if (portfolioBtc) {
        localStorage.setItem('satsPortfolioBtc', portfolioBtc);
      } else {
        localStorage.removeItem('satsPortfolioBtc');
      }
    } catch {
      // localStorage unavailable, silently ignore
    }
  }, [portfolioBtc]);

  // Fetch BTC price from CoinGecko (public API, no key needed)
  useEffect(() => {
    async function fetchPrice() {
      try {
        // For multi-currency support
        const currencyCodes = CURRENCIES.map(c => c.code).join(',');
        const response = await fetch(
          `/api/v3/simple/price?ids=bitcoin&vs_currencies=${currencyCodes}`
        );
        if (!response.ok) throw new Error('Failed to fetch BTC price');
        const data = await response.json();
        
        setBtcPriceUSD(data.bitcoin.usd);
        
        // Update local currency price display
        updateLocalPrice(data, selectedCurrency.code);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Could not load BTC price. Will retry...');
        setLoading(false);
      }
    }

    fetchPrice();
    const interval = setInterval(fetchPrice, PRICE_REFRESH_INTERVAL);
    return () => clearInterval(interval);
  }, [selectedCurrency]);

  // Update local currency display when currency changes
  function updateLocalPrice(data, currencyCode) {
    if (data.bitcoin && data.bitcoin[currencyCode]) {
      setCurrentPriceLocal(data.bitcoin[currencyCode]);
    } else if (data.bitcoin.usd && selectedCurrency.code === 'usd') {
      setCurrentPriceLocal(data.bitcoin.usd);
    } else {
      // Fallback to USD rate
      const usdRate = data.bitcoin?.usd || 0;
      const localCode = currencyCode;
      if (localCode === 'eur') setCurrentPriceLocal(usdRate * 0.92); // approximate
      else if (localCode === 'gbp') setCurrentPriceLocal(usdRate * 0.79);
    }
  }

  // Feature #3: Check price alerts every 15 seconds
  useEffect(() => {
    const alertCheckInterval = setInterval(() => {
      setAlerts(prev => prev.map(alert => {
        if (alert.triggered) return alert; // Already triggered
        
        let shouldTrigger = false;
        if (alert.direction === 'above' && btcPriceUSD >= alert.price) {
          shouldTrigger = true;
        } else if (alert.direction === 'below' && btcPriceUSD <= alert.price) {
          shouldTrigger = true;
        }
        
        if (shouldTrigger) {
          // Send browser notification (Feature #3)
          sendNotification(`🟠 BTC Alert! Bitcoin is ${alert.direction} $${alert.price.toLocaleString()}`, 
            `Current price: $${btcPriceUSD.toLocaleString()}`);
        }
        
        return { ...alert, triggered: shouldTrigger };
      }));
    }, 15000); // Check every 15 seconds
    
    return () => clearInterval(alertCheckInterval);
  }, [btcPriceUSD]);

  // Feature #3: Browser notification helper
  function sendNotification(title, body) {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(title, { body, icon: '/favicon.svg' });
    } else if ('Notification' in window && Notification.permission !== 'denied') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          new Notification(title, { body, icon: '/favicon.svg' });
        }
      });
    }
  }

  // Feature #3: Add price alert
  function addAlert() {
    const price = parseFloat(newAlertPrice);
    if (isNaN(price) || price <= 0) return;
    
    const newAlert = {
      id: Date.now(),
      price,
      direction: alertDirection,
      triggered: false,
    };
    
    setAlerts(prev => [...prev, newAlert]);
    setNewAlertPrice('');
  }

  function removeAlert(id) {
    setAlerts(prev => prev.filter(a => a.id !== id));
  }

  // Feature #4: Portfolio tracker calculation
  useEffect(() => {
    const btc = parseFloat(portfolioBtc);
    if (!isNaN(btc) && btc > 0) {
      setPortfolioValue(btc * currentPriceLocal);
    } else {
      setPortfolioValue(0);
    }
  }, [portfolioBtc, currentPriceLocal]);

  const [portfolioValue, setPortfolioValue] = useState(0);

  function formatLocalCurrency(amount) {
    if (amount === 0 && selectedCurrency.code !== 'usd') return `${selectedCurrency.symbol}0.00`;
    
    const symbolMap = { usd: '$', eur: '€', gbp: '£' };
    const sym = symbolMap[selectedCurrency.code] || '$';
    
    if (amount === 0) return `${sym}0.00`;
    
    // Get USD value for formatting, then replace symbol
    const usdValue = selectedCurrency.code === 'usd' ? amount : amount / currentPriceLocal * btcPriceUSD;
    const formatted = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: selectedCurrency.code.toUpperCase(),
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
    
    return formatted.replace('$', sym);
  }

  // Convert between units based on active mode and current value
  function convert(newInputValue) {
    if (!btcPriceUSD || btcPriceUSD <= 0) return;

    const num = parseFloat(newInputValue);
    if (isNaN(num)) {
      setUsdCents(0);
      setBtcSatoshi(0);
      return;
    }

    let newUsdCents, newBtcSatoshi, newInputVal;

    switch (activeMode) {
      case 'usd':
        // Input is USD → calculate BTC and Sats
        const usd = num;
        const satsFromUsd = Math.round((usd / btcPriceUSD) * SATS_PER_BTC);
        
        newUsdCents = Math.round(usd * 100);
        newBtcSatoshi = satsFromUsd;
        break;

      case 'btc':
        // Input is BTC → calculate USD and Sats
        const btc = num;
        const usdFromBtc = btc * btcPriceUSD;
        const satsFromBtc = Math.round(btc * SATS_PER_BTC);
        
        newUsdCents = Math.round(usdFromBtc * 100);
        newBtcSatoshi = satsFromBtc;
        break;

      case 'sats':
        // Input is Sats → calculate USD and BTC
        const sats = num;
        const usdFromSats = (sats / SATS_PER_BTC) * btcPriceUSD;
        
        newUsdCents = Math.round(usdFromSats * 100);
        newBtcSatoshi = sats;
        break;

      default:
        return;
    }

    setUsdCents(newUsdCents);
    setBtcSatoshi(newBtcSatoshi);
    
    // Show quick amounts after first calculation in USD mode (Feature #1)
    if (activeMode === 'usd' && !showQuickAmounts) {
      setShowQuickAmounts(true);
    }
  }

  function handleInputChange(value) {
    // Remove commas and any non-numeric chars except period
    const cleaned = value.replace(/[^0-9.]/g, '');
    
    // If empty or just a period, reset to zero state
    if (!cleaned || cleaned === '.') {
      setInputValue('');
      setUsdCents(0);
      setBtcSatoshi(0);
      return;
    }

    let finalValue = '';
    const numValue = parseFloat(cleaned);
    
    if (activeMode === 'sats') {
      // Sats should be integers only - remove decimal part entirely
      const noDecimal = cleaned.split('.')[0];
      finalValue = noDecimal || '';
      
      if (noDecimal && !isNaN(parseInt(noDecimal))) {
        convert(parseInt(noDecimal));
      } else {
        setUsdCents(0);
        setBtcSatoshi(0);
      }
    } else if (activeMode === 'usd') {
      // USD can have decimals but limit to 2 decimal places
      const parts = cleaned.split('.');
      let formatted = parts[0] || '';
      if (parts.length > 1) {
        formatted += '.' + parts.slice(1).join('').slice(0, 2);
      }
      finalValue = formatted;
      
      if (!isNaN(numValue)) {
        convert(numValue);
      } else {
        setUsdCents(0);
        setBtcSatoshi(0);
      }
    } else if (activeMode === 'btc') {
      // BTC can have up to 8 decimal places
      const parts = cleaned.split('.');
      let formatted = parts[0] || '';
      if (parts.length > 1) {
        formatted += '.' + parts.slice(1).join('').slice(0, 8);
      }
      finalValue = formatted;
      
      if (!isNaN(numValue)) {
        convert(numValue);
      } else {
        setUsdCents(0);
        setBtcSatoshi(0);
      }
    }

    setInputValue(finalValue);
  }

  // Feature #1: Quick amount handler
  function handleQuickAmount(amount) {
    setActiveMode('usd');
    setInputValue(amount.toString());
    convert(amount);
    inputRef.current?.focus();
  }

  function switchMode(mode) {
    setActiveMode(mode);
    
    // Reset display based on current conversion values
    if (mode === 'usd') {
      const usdValue = usdCents > 0 ? (usdCents / 100).toFixed(2) : '';
      setInputValue(usdValue);
    } else if (mode === 'btc') {
      const btcValue = btcSatoshi > 0 ? (btcSatoshi / SATS_PER_BTC).toFixed(8) : '';
      setInputValue(btcValue);
    } else if (mode === 'sats') {
      setInputValue(btcSatoshi > 0 ? btcSatoshi.toLocaleString('en-US') : '');
    }
  }

  // Feature #2: Sats per dollar helper
  function getSatsPerDollar() {
    if (selectedCurrency.code !== 'usd' && currentPriceLocal > 0) {
      return Math.round((1 / currentPriceLocal) * SATS_PER_BTC);
    }
    if (!btcPriceUSD || btcPriceUSD <= 0) return 0;
    return Math.round((1 / btcPriceUSD) * SATS_PER_BTC);
  }

  function formatBTC(btcValue) {
    // btcValue is in satoshi precision already
    const btc = btcValue / SATS_PER_BTC;
    if (btc < 0.001) return btc.toFixed(8) + ' BTC';
    if (btc < 1) return btc.toFixed(6) + ' BTC';
    return btc.toFixed(4) + ' BTC';
  }

  function formatSats(sats) {
    if (sats === 0) return '0 sats';
    return new Intl.NumberFormat('en-US').format(sats).concat(' sats');
  }

  // Feature #8: Share conversion card
  function shareConversion() {
    if (!inputValue || btcSatoshi === 0) return;
    
    const currencySymbol = selectedCurrency.symbol;
    const amountStr = inputValue + ' ' + currencySymbol;
    const btcStr = formatBTC(btcSatoshi);
    const satsStr = formatSats(btcSatoshi);
    
    // Create a shareable text card (Feature #8)
    const cardText = `₿ Sats Calculator\n${amountStr} = ${btcStr}\n= ${satsStr}\n@current price`;
    
    setShareData(cardText);
    
    // Try native share API first, fallback to clipboard
    if ('share' in navigator && /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
      navigator.share({ title: 'Sats Calculator', text: cardText }).catch(() => {});
    } else {
      // Copy to clipboard
      navigator.clipboard.writeText(cardText).then(() => {
        setShareData('Copied to clipboard! 📋');
        setTimeout(() => setShareData(null), 2000);
      });
    }
  }

  const satsPerDollar = getSatsPerDollar();

  // Loading state while fetching price
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-orange-500 animate-pulse text-xl font-bold">
          Loading Bitcoin Price...
        </div>
      </div>
    );
  }

  const currencySymbol = selectedCurrency.symbol;

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
      {/* Main container */}
      <div className="w-full max-w-md mx-auto space-y-4">
        
        {/* Currency selector — centered above title */}
        <div className="text-center mb-2">
          <select
            value={selectedCurrency.code}
            onChange={(e) => {
              const curr = CURRENCIES.find(c => c.code === e.target.value);
              if (curr) setSelectedCurrency(curr);
            }}
            className="bg-gray-900 text-white border border-orange-500/30 rounded-lg px-4 py-2 text-sm focus:border-orange-500 focus:outline-none"
          >
            {CURRENCIES.map(c => (
              <option key={c.code} value={c.code}>
                {c.flag} {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* Header with Bitcoin price */}
        <div className="text-center">
          <h1 className="text-orange-500 font-bold text-3xl mb-2 flex items-center justify-center gap-2">
            <span role="img" aria-label="Bitcoin">₿</span>
            Sats Calculator
          </h1>
          
          {error && (
            <p className="text-red-400 text-sm">{error}</p>
          )}
          
          {/* Header: BTC price + Sats per dollar only, no Bitcoin measurement */}
          <div className="bg-gray-900 rounded-xl p-3 border border-orange-500/20 flex items-center justify-between">
            <div className="flex-1 text-center space-y-0.5">
              <p className="text-green-400 font-bold text-lg tabular-nums">{formatLocalCurrency(currentPriceLocal)}</p>
              <p className="text-yellow-400 text-xs uppercase tracking-wider leading-tight">⚡ {satsPerDollar.toLocaleString()} sats/{selectedCurrency.symbol}</p>
            </div>
          </div>
        </div>

        {/* Mode switcher */}
        <div className="bg-gray-900 rounded-xl p-1 flex border border-orange-500/20">
          {[
            { mode: 'usd', label: 'USD', icon: currencySymbol },
            { mode: 'btc', label: 'BTC', icon: '₿' },
            { mode: 'sats', label: 'SATS', icon: '⚡' }
          ].map(({ mode, label, icon }) => (
            <button
              key={mode}
              onClick={() => switchMode(mode)}
              className={`flex-1 py-2 px-3 rounded-lg text-sm font-bold transition-all ${
                activeMode === mode
                  ? 'bg-orange-500 text-black shadow-lg shadow-orange-500/25'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <span className="mr-1">{icon}</span>
              {label}
            </button>
          ))}
        </div>

        {/* Main input */}
        <div className="bg-gray-900 rounded-xl p-6 border border-orange-500/20">
          <label className="text-gray-400 text-xs uppercase tracking-wider mb-2 block">
            {activeMode === 'usd' && `Enter ${selectedCurrency.name} Amount`}
            {activeMode === 'btc' && 'Enter BTC Amount'}
            {activeMode === 'sats' && 'Enter Sats Amount'}
          </label>
          
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              inputMode={activeMode === 'sats' ? 'numeric' : 'decimal'}
              value={inputValue}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder={activeMode === 'usd' ? currencySymbol : activeMode === 'btc' ? '₿' : '⚡'}
              className="w-full bg-gray-950 text-white text-3xl font-bold py-4 pr-16 rounded-lg border border-orange-500/20 focus:border-orange-500 focus:outline-none transition-colors tabular-nums"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-orange-500 font-bold">
              {activeMode === 'usd' && currencySymbol}
              {activeMode === 'btc' && '₿'}
              {activeMode === 'sats' && '⚡'}
            </span>
          </div>
        </div>

        {/* Feature #1: Quick amount buttons (shown after first calculation in USD mode) */}
        {showQuickAmounts && activeMode === 'usd' && (
          <div className="bg-gray-900 rounded-xl p-4 border border-orange-500/20">
            <p className="text-gray-400 text-xs uppercase tracking-wider mb-3 text-center">Quick amounts</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {QUICK_AMOUNTS.map(amount => (
                <button
                  key={amount}
                  onClick={() => handleQuickAmount(amount)}
                  className={`bg-gray-800 hover:bg-orange-500 hover:text-black text-white px-3 py-2 rounded-lg text-sm font-bold transition-all border border-gray-700 ${
                    inputValue === amount.toString() ? 'bg-orange-500 text-black' : ''
                  }`}
                >
                  {currencySymbol}{amount.toLocaleString()}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results */}
        <div className="bg-gray-900 rounded-xl p-6 border border-orange-500/20 space-y-4">
          <div className="flex justify-between items-center mb-3">
            <p className="text-gray-400 text-xs uppercase tracking-wider">Equivalents</p>
            
            {/* Feature #8: Share button */}
            {btcSatoshi > 0 && (
              <button
                onClick={shareConversion}
                className="bg-orange-500/20 hover:bg-orange-500 text-orange-400 hover:text-black px-3 py-1 rounded-lg text-xs font-bold transition-all"
              >
                📤 Share
              </button>
            )}
          </div>
          
          {/* USD equivalent */}
          {usdCents > 0 && (
            <div className="flex justify-between items-center py-2 border-b border-gray-800">
              <span className="text-gray-400 text-sm flex items-center gap-1">
                💵 {selectedCurrency.name}
              </span>
              <span className="text-green-400 font-bold tabular-nums">
                {formatLocalCurrency(selectedCurrency.code === 'usd' ? usdCents / 100 : (usdCents / 100) * currentPriceLocal)}
              </span>
            </div>
          )}

          {/* BTC equivalent */}
          {btcSatoshi > 0 && (
            <>
              <div className="flex justify-between items-center py-2 border-b border-gray-800">
                <span className="text-gray-400 text-sm flex items-center gap-1">
                  ₿ BTC
                </span>
                <span className="text-orange-500 font-bold tabular-nums">
                  {formatBTC(btcSatoshi)}
                </span>
              </div>

              {/* Sats equivalent */}
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-400 text-sm flex items-center gap-1">
                  ⚡ SATS
                </span>
                <span className="text-orange-500 font-bold tabular-nums">
                  {formatSats(btcSatoshi)}
                </span>
              </div>
            </>
          )}

          {/* Zero state */}
          {usdCents === 0 && btcSatoshi === 0 && (
            <p className="text-gray-500 text-center py-4 italic">
              Enter an amount above to see conversions...
            </p>
          )}

          {/* Current rate display */}
          {btcPriceUSD > 0 && btcSatoshi > 0 && (
            <div className="pt-3 border-t border-gray-800 text-center">
              <p className="text-gray-500 text-xs">
                At current price • Refreshes every minute
              </p>
            </div>
          )}
        </div>

        {/* Feature #4: Portfolio tracker */}
        {!showPortfolio ? (
          <button
            onClick={() => setShowPortfolio(true)}
            className="w-full bg-gray-900 text-orange-500 font-bold py-3 px-4 rounded-xl border border-orange-500/20 hover:bg-gray-800 transition-all"
          >
            📊 Portfolio Tracker
          </button>
        ) : (
          <div className="bg-gray-900 rounded-xl p-6 border border-orange-500/20">
            <p className="text-gray-400 text-xs uppercase tracking-wider mb-3">Portfolio Value</p>
            
            <div className="flex gap-2 mb-3">
              <input
                type="number"
                value={portfolioBtc}
                onChange={(e) => setPortfolioBtc(e.target.value)}
                placeholder="BTC holdings"
                className="flex-1 bg-gray-950 text-white py-2 px-3 rounded-lg border border-orange-500/20 focus:border-orange-500 focus:outline-none tabular-nums"
              />
            </div>
            
            {portfolioValue > 0 && (
              <div className="space-y-2">
                <div className="flex justify-between items-center py-1 border-b border-gray-800">
                  <span className="text-green-400 text-sm">💵 {selectedCurrency.name} Value</span>
                  <span className="text-green-400 font-bold tabular-nums">{formatLocalCurrency(portfolioValue)}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-gray-800">
                  <span className="text-orange-500 text-sm">₿ BTC</span>
                  <span className="text-orange-500 font-bold tabular-nums">{portfolioBtc} BTC</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-gray-800">
                  <span className="text-yellow-400 text-sm">⚡ Total Sats</span>
                  <span className="text-yellow-400 font-bold tabular-nums">{formatSats(Math.round(parseFloat(portfolioBtc) * SATS_PER_BTC))}</span>
                </div>
              </div>
            )}
            
            {!portfolioBtc && (
              <p className="text-gray-500 text-center py-2 italic">Enter your BTC holdings</p>
            )}
          </div>
        )}

        {/* Feature #3: Price Alerts */}
        {alerts.length > 0 && (
          <div className="bg-gray-900 rounded-xl p-4 border border-orange-500/20">
            <p className="text-gray-400 text-xs uppercase tracking-wider mb-3">🔔 Price Alerts</p>
            
            {/* Add alert form */}
            <div className="flex gap-2 mb-3">
              <select
                value={alertDirection}
                onChange={(e) => setAlertDirection(e.target.value)}
                className="bg-gray-800 text-white border border-orange-500/30 rounded-lg px-2 py-1 text-sm focus:border-orange-500 focus:outline-none"
              >
                <option value="above">Above</option>
                <option value="below">Below</option>
              </select>
              
              <input
                type="number"
                value={newAlertPrice}
                onChange={(e) => setNewAlertPrice(e.target.value)}
                placeholder="$ Price"
                className="flex-1 bg-gray-950 text-white py-1 px-3 rounded-lg border border-orange-500/20 focus:border-orange-500 focus:outline-none tabular-nums text-sm"
              />
              
              <button
                onClick={addAlert}
                disabled={!newAlertPrice || parseFloat(newAlertPrice) <= 0}
                className="bg-green-500 text-black font-bold py-1 px-3 rounded-lg hover:bg-green-400 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Add
              </button>
            </div>
            
            {/* Alert list */}
            {alerts.map(alert => (
              <div key={alert.id} className={`flex justify-between items-center py-2 border-b border-gray-800 last:border-0 ${alert.triggered ? 'bg-green-500/10' : ''}`}>
                <span className={`text-sm ${alert.triggered ? 'text-green-400 font-bold' : 'text-gray-300'}`}>
                  {alert.direction === 'above' ? '🔺' : '🔻'} When BTC is {alert.direction} ${alert.price.toLocaleString()}
                  {alert.triggered && ' ✅ TRIGGERED!'}
                </span>
                <button onClick={() => removeAlert(alert.id)} className="text-red-400 hover:text-white text-xs">✕</button>
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="text-center">
          <p className="text-gray-600 text-xs">
            Price from CoinGecko API • 1 BTC = {SATS_PER_BTC.toLocaleString()} sats
          </p>
          
          {/* Share card result */}
          {shareData && (
            <p className="text-green-400 text-xs mt-2 animate-pulse">
              ✅ {shareData}
            </p>
          )}
        </div>


      </div>
    </div>
  );
}

export default App;
