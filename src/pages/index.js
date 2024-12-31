import React, { useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { Key, Copy, RefreshCw, Check } from 'lucide-react';

const PasswordGenerator = () => {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(12);
  const [prefix, setPrefix] = useState('');
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [copied, setCopied] = useState(false);

  const generatePassword = () => {
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '.,+*-/';

    let chars = '';
    if (includeUppercase) chars += uppercase;
    if (includeLowercase) chars += lowercase;
    if (includeNumbers) chars += numbers;
    if (includeSymbols) chars += symbols;

    if (chars === '') {
      alert('Lütfen en az bir karakter türü seçin');
      return;
    }

    let generatedPassword = prefix || '';
    const remainingLength = length - generatedPassword.length;

    for (let i = 0; i < remainingLength; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      generatedPassword += chars[randomIndex];
    }
    setPassword(generatedPassword);
  };

  const copyToClipboard = () => {
    if (password) {
      navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-4 flex flex-col justify-center">
      <Head>
        <title>PASSWD GENERATOR</title>
        <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </Head>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md mx-auto"
      >
        <div className="relative px-4 py-6 sm:px-6 sm:py-8 bg-white shadow-lg rounded-2xl">
          <div className="max-w-md mx-auto">
            <div className="space-y-6">
              <div className="flex items-center justify-center gap-2">
                <Key className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500" />
                <h1 className="text-2xl sm:text-3xl font-bold text-center">PASSWD GENERATOR</h1>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Şifre Uzunluğu:
                  </label>
                  <input
                    type="number"
                    min="6"
                    max="30"
                    value={length}
                    onChange={(e) => setLength(parseInt(e.target.value))}
                    className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-base"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Referans (İsteğe bağlı, en fazla 3 karakter):
                  </label>
                  <input
                    type="text"
                    maxLength="3"
                    value={prefix}
                    onChange={(e) => setPrefix(e.target.value)}
                    placeholder="Referans girin"
                    className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-base"
                  />
                </div>

                <div className="space-y-3 py-2">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={includeUppercase}
                      onChange={(e) => setIncludeUppercase(e.target.checked)}
                      className="form-checkbox h-5 w-5 text-blue-500"
                    />
                    <span className="ml-3 text-base">Büyük Harf Kullan</span>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={includeLowercase}
                      onChange={(e) => setIncludeLowercase(e.target.checked)}
                      className="form-checkbox h-5 w-5 text-blue-500"
                    />
                    <span className="ml-3 text-base">Küçük Harf Kullan</span>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={includeNumbers}
                      onChange={(e) => setIncludeNumbers(e.target.checked)}
                      className="form-checkbox h-5 w-5 text-blue-500"
                    />
                    <span className="ml-3 text-base">Rakam Kullan</span>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={includeSymbols}
                      onChange={(e) => setIncludeSymbols(e.target.checked)}
                      className="form-checkbox h-5 w-5 text-blue-500"
                    />
                    <span className="ml-3 text-base">Özel Karakter Kullan (. , + * - /)</span>
                  </div>
                </div>

                {password && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-4 bg-gray-100 rounded-lg relative"
                  >
                    <p className="font-mono text-base sm:text-lg break-all">{password}</p>
                  </motion.div>
                )}

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={generatePassword}
                    className="flex-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 text-base"
                  >
                    <RefreshCw className="w-5 h-5" />
                    Şifre Oluştur
                  </motion.button>

                  {password && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={copyToClipboard}
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 text-base"
                    >
                      {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                      {copied ? 'Kopyalandı!' : 'Kopyala'}
                    </motion.button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PasswordGenerator;