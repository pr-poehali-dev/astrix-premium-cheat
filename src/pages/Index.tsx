import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Icon from "@/components/ui/icon";

export default function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-20 left-20 w-96 h-96 bg-primary/30 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-[500px] h-[500px] bg-secondary/30 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/20 rounded-full blur-[180px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <nav className="fixed top-0 w-full z-50 backdrop-blur-xl bg-background/50 border-b border-border/50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <span className="text-xl font-bold">A</span>
            </div>
            <span className="text-2xl font-bold tracking-tight">Astrix</span>
          </div>
          <div className="hidden md:flex gap-8">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Функционал</a>
            <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">Цены</a>
            <a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">Контакты</a>
          </div>
          <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
            Купить
          </Button>
        </div>
      </nav>

      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto text-center">
          <div className="inline-block mb-6 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold">
            🚀 Премиум чит нового поколения
          </div>
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent animate-fade-in">
            Astrix
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto">
            Максимальный функционал, невероятные визуалы, безупречная оптимизация и надёжные обходы — всё в одном чите
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button size="lg" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-lg px-8 py-6">
              <Icon name="Download" className="mr-2" size={20} />
              Скачать сейчас
            </Button>
            <Button size="lg" variant="outline" className="border-primary/50 hover:bg-primary/10 text-lg px-8 py-6">
              <Icon name="Play" className="mr-2" size={20} />
              Смотреть демо
            </Button>
          </div>
        </div>
      </section>

      <section id="features" className="py-20 px-6">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            Почему <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Astrix</span>?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 bg-card/50 backdrop-blur-xl border-border/50 hover:border-primary/50 transition-all hover:scale-105">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4">
                <Icon name="Sparkles" size={28} className="text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Визуалы</h3>
              <p className="text-muted-foreground">
                Кастомизируемый ESP, 3D бокс, скелетон, хелсбар, оружие и многое другое
              </p>
            </Card>

            <Card className="p-6 bg-card/50 backdrop-blur-xl border-border/50 hover:border-primary/50 transition-all hover:scale-105">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-secondary to-primary flex items-center justify-center mb-4">
                <Icon name="Zap" size={28} className="text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Оптимизация</h3>
              <p className="text-muted-foreground">
                Минимальная нагрузка на систему, стабильные 300+ FPS без просадок
              </p>
            </Card>

            <Card className="p-6 bg-card/50 backdrop-blur-xl border-border/50 hover:border-primary/50 transition-all hover:scale-105">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4">
                <Icon name="Shield" size={28} className="text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Обходы</h3>
              <p className="text-muted-foreground">
                Обход всех античитов, регулярные обновления защиты
              </p>
            </Card>

            <Card className="p-6 bg-card/50 backdrop-blur-xl border-border/50 hover:border-primary/50 transition-all hover:scale-105">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-secondary to-primary flex items-center justify-center mb-4">
                <Icon name="Settings" size={28} className="text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Функционал</h3>
              <p className="text-muted-foreground">
                Аимбот, тригербот, радар, античит обход, конфиг система и 50+ функций
              </p>
            </Card>
          </div>

          <div className="mt-16 grid md:grid-cols-3 gap-6">
            <Card className="p-6 bg-card/50 backdrop-blur-xl border-border/50">
              <div className="flex items-center gap-3 mb-3">
                <Icon name="Target" size={24} className="text-primary" />
                <h4 className="font-semibold text-lg">Аимбот</h4>
              </div>
              <p className="text-muted-foreground text-sm">
                Плавная наводка, настройка FOV, контроль отдачи, смарт-таргет
              </p>
            </Card>

            <Card className="p-6 bg-card/50 backdrop-blur-xl border-border/50">
              <div className="flex items-center gap-3 mb-3">
                <Icon name="Eye" size={24} className="text-primary" />
                <h4 className="font-semibold text-lg">ESP</h4>
              </div>
              <p className="text-muted-foreground text-sm">
                Wallhack, отображение игроков, предметов, дистанция, здоровье
              </p>
            </Card>

            <Card className="p-6 bg-card/50 backdrop-blur-xl border-border/50">
              <div className="flex items-center gap-3 mb-3">
                <Icon name="Radio" size={24} className="text-primary" />
                <h4 className="font-semibold text-lg">Радар</h4>
              </div>
              <p className="text-muted-foreground text-sm">
                2D/3D радар, отображение врагов на карте в реальном времени
              </p>
            </Card>
          </div>
        </div>
      </section>

      <section id="pricing" className="py-20 px-6 bg-muted/20">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Выберите свой план
          </h2>
          <p className="text-center text-muted-foreground mb-16 text-lg">
            Все планы включают полный функционал без ограничений
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <Card className="p-6 bg-card/50 backdrop-blur-xl border-border/50 hover:border-primary/50 transition-all hover:scale-105">
              <div className="text-center">
                <Icon name="Calendar" size={32} className="mx-auto mb-4 text-primary" />
                <h3 className="text-2xl font-bold mb-2">Неделя</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold">150₽</span>
                  <span className="text-muted-foreground">/7 дней</span>
                </div>
                <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                  Купить
                </Button>
                <p className="text-sm text-muted-foreground mt-4">
                  Идеально для теста
                </p>
              </div>
            </Card>

            <Card className="p-6 bg-card/50 backdrop-blur-xl border-primary/50 border-2 hover:scale-105 transition-all relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-gradient-to-br from-primary to-secondary text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                Популярный
              </div>
              <div className="text-center">
                <Icon name="CalendarDays" size={32} className="mx-auto mb-4 text-primary" />
                <h3 className="text-2xl font-bold mb-2">Месяц</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold">250₽</span>
                  <span className="text-muted-foreground">/30 дней</span>
                </div>
                <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                  Купить
                </Button>
                <p className="text-sm text-muted-foreground mt-4">
                  Лучшее соотношение
                </p>
              </div>
            </Card>

            <Card className="p-6 bg-card/50 backdrop-blur-xl border-border/50 hover:border-primary/50 transition-all hover:scale-105">
              <div className="text-center">
                <Icon name="CalendarRange" size={32} className="mx-auto mb-4 text-primary" />
                <h3 className="text-2xl font-bold mb-2">Год</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold">400₽</span>
                  <span className="text-muted-foreground">/365 дней</span>
                </div>
                <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                  Купить
                </Button>
                <p className="text-sm text-muted-foreground mt-4">
                  Экономия 73%
                </p>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-primary/20 to-secondary/20 backdrop-blur-xl border-primary border-2 hover:scale-105 transition-all relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-gradient-to-br from-secondary to-primary text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                Лучшая цена
              </div>
              <div className="text-center">
                <Icon name="Infinity" size={32} className="mx-auto mb-4 text-primary" />
                <h3 className="text-2xl font-bold mb-2">Навсегда</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold">550₽</span>
                  <span className="text-muted-foreground">/∞</span>
                </div>
                <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                  Купить
                </Button>
                <p className="text-sm text-muted-foreground mt-4">
                  Пожизненный доступ
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 px-6">
        <div className="container mx-auto max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Остались вопросы?
          </h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">
            Свяжитесь с нами и мы ответим в течение 24 часов
          </p>
          <Card className="p-8 bg-card/50 backdrop-blur-xl border-border/50">
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Ваше имя
                </label>
                <Input
                  id="name"
                  placeholder="Введите ваше имя"
                  className="bg-background/50 border-border/50"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  className="bg-background/50 border-border/50"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Сообщение
                </label>
                <Textarea
                  id="message"
                  placeholder="Расскажите о вашем вопросе..."
                  rows={5}
                  className="bg-background/50 border-border/50"
                />
              </div>
              <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-lg py-6">
                <Icon name="Send" className="mr-2" size={20} />
                Отправить
              </Button>
            </form>
          </Card>

          <div className="mt-12 flex justify-center gap-6">
            <a href="#" className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center hover:bg-primary/20 transition-colors">
              <Icon name="MessageCircle" size={20} className="text-primary" />
            </a>
            <a href="#" className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center hover:bg-primary/20 transition-colors">
              <Icon name="Send" size={20} className="text-primary" />
            </a>
            <a href="#" className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center hover:bg-primary/20 transition-colors">
              <Icon name="Mail" size={20} className="text-primary" />
            </a>
          </div>
        </div>
      </section>

      <footer className="py-8 px-6 border-t border-border/50 backdrop-blur-xl">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>© 2025 Astrix. Все права защищены.</p>
          <p className="text-sm mt-2">Премиум чит для профессионалов</p>
        </div>
      </footer>
    </div>
  );
}
