import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [downloadingVCard, setDownloadingVCard] = useState(false);

  const contactInfo = {
    name: 'Максим',
    company: 'ЭКО-ДЕЗ',
    phone: '+7 (999) 123-45-67',
    email: 'info@eco-dez.online',
    website: 'eco-dez.online',
    whatsapp: '+79991234567',
    telegram: 'ecodez_online',
    services: [
      { name: 'Дезинсекция', icon: 'Bug' },
      { name: 'Дератизация', icon: 'Rat' },
      { name: 'Дезинфекция', icon: 'Droplets' }
    ]
  };

  const generateVCard = () => {
    const vCard = `BEGIN:VCARD
VERSION:3.0
FN:${contactInfo.name}
ORG:${contactInfo.company}
TEL;TYPE=CELL:${contactInfo.phone}
EMAIL:${contactInfo.email}
URL:https://${contactInfo.website}
END:VCARD`;

    const blob = new Blob([vCard], { type: 'text/vcard' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${contactInfo.name}-${contactInfo.company}.vcf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const handleDownloadVCard = () => {
    setDownloadingVCard(true);
    generateVCard();
    setTimeout(() => setDownloadingVCard(false), 1000);
  };

  const vCardData = `BEGIN:VCARD\nVERSION:3.0\nFN:${contactInfo.name}\nORG:${contactInfo.company}\nTEL:${contactInfo.phone}\nEMAIL:${contactInfo.email}\nURL:https://${contactInfo.website}\nEND:VCARD`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(vCardData)}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-muted via-background to-accent/20 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-card/95 backdrop-blur-sm shadow-2xl border-2 border-primary/20 overflow-hidden">
        <div className="bg-gradient-to-r from-primary to-secondary p-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 left-4 w-20 h-20 border-2 border-white rounded-full"></div>
            <div className="absolute bottom-4 right-4 w-16 h-16 border-2 border-white rounded-full"></div>
            <div className="absolute top-1/2 right-8 w-12 h-12 border-2 border-white rounded-full"></div>
          </div>
          <div className="relative z-10">
            <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-4 border-white/30">
              <Icon name="Leaf" size={48} className="text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">{contactInfo.name}</h1>
            <p className="text-xl text-white/90 font-semibold">{contactInfo.company}</p>
          </div>
        </div>

        <div className="p-8 space-y-6">
          <div className="flex justify-center">
            <div className="bg-white p-4 rounded-2xl shadow-lg border-2 border-primary/20">
              <img 
                src={qrCodeUrl} 
                alt="QR-код для сохранения контакта" 
                className="w-48 h-48"
              />
              <p className="text-center mt-3 text-sm font-medium text-muted-foreground">
                Сканируйте для сохранения
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 bg-accent/50 rounded-xl hover:bg-accent transition-colors">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                <Icon name="Phone" size={20} className="text-white" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium">Телефон</p>
                <a href={`tel:${contactInfo.phone}`} className="text-foreground font-semibold hover:text-primary transition-colors">
                  {contactInfo.phone}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-accent/50 rounded-xl hover:bg-accent transition-colors">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                <Icon name="Mail" size={20} className="text-white" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium">Email</p>
                <a href={`mailto:${contactInfo.email}`} className="text-foreground font-semibold hover:text-primary transition-colors break-all">
                  {contactInfo.email}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-accent/50 rounded-xl hover:bg-accent transition-colors">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                <Icon name="Globe" size={20} className="text-white" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium">Сайт</p>
                <a 
                  href={`https://${contactInfo.website}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-foreground font-semibold hover:text-primary transition-colors break-all"
                >
                  {contactInfo.website}
                </a>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-bold text-center text-foreground flex items-center justify-center gap-2">
              <Icon name="MessageCircle" size={20} className="text-primary" />
              Быстрая связь
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <a
                href={`https://wa.me/${contactInfo.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 p-4 bg-gradient-to-br from-[#25D366] to-[#128C7E] rounded-xl hover:scale-105 transition-transform shadow-lg"
              >
                <Icon name="MessageCircle" size={28} className="text-white" />
                <span className="text-sm font-semibold text-white">WhatsApp</span>
              </a>
              <a
                href={`https://t.me/${contactInfo.telegram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 p-4 bg-gradient-to-br from-[#229ED9] to-[#0088cc] rounded-xl hover:scale-105 transition-transform shadow-lg"
              >
                <Icon name="Send" size={28} className="text-white" />
                <span className="text-sm font-semibold text-white">Telegram</span>
              </a>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-bold text-center text-foreground flex items-center justify-center gap-2">
              <Icon name="Briefcase" size={20} className="text-primary" />
              Наши услуги
            </h3>
            <div className="grid grid-cols-1 gap-2">
              {contactInfo.services.map((service, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-3 p-3 bg-gradient-to-r from-accent/70 to-accent/30 rounded-lg border border-primary/10"
                >
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon name={service.icon as any} size={16} className="text-primary" />
                  </div>
                  <span className="font-medium text-foreground">{service.name}</span>
                </div>
              ))}
            </div>
          </div>

          <Button 
            onClick={handleDownloadVCard}
            disabled={downloadingVCard}
            className="w-full bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary text-white font-semibold py-6 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
          >
            {downloadingVCard ? (
              <span className="flex items-center gap-2">
                <Icon name="Download" size={20} className="animate-bounce" />
                Сохранение...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Icon name="Download" size={20} />
                Сохранить контакт
              </span>
            )}
          </Button>
        </div>

        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 px-8 py-4 text-center border-t border-primary/20">
          <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
            <Icon name="Leaf" size={16} className="text-primary" />
            Экологичные решения для вашего комфорта
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Index;