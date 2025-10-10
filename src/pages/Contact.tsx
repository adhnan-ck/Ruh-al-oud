import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { MessageCircle, Mail, Instagram, Facebook } from 'lucide-react';

const Contact = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-8 animate-fade-in">Get in Touch</h1>
          
          <div className="grid md:grid-cols-2 gap-8 animate-slide-up">
            <div className="space-y-6">
              <div>
                <h2 className="font-display text-2xl font-semibold mb-4">Contact Us</h2>
                <p className="text-muted-foreground mb-6">
                  Have questions about our fragrances or need help choosing the perfect scent? 
                  We're here to help!
                </p>
              </div>

              <div className="space-y-4">
                <a 
                  href="https://wa.me/918848320553" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 bg-card rounded-lg hover:shadow-soft transition-all"
                >
                  <MessageCircle className="h-6 w-6 text-accent" />
                  <div>
                    <p className="font-medium">WhatsApp</p>
                    <p className="text-sm text-muted-foreground">+91 88483 20553</p>
                  </div>
                </a>

                <a 
                  href="mailto:contact@ruhaloud.com"
                  className="flex items-center gap-3 p-4 bg-card rounded-lg hover:shadow-soft transition-all"
                >
                  <Mail className="h-6 w-6 text-accent" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">ruhaloud123@gmail.com</p>
                  </div>
                </a>
              </div>

              <div>
                <h3 className="font-display text-xl font-semibold mb-4">Follow Us</h3>
                <div className="flex gap-4">
                  <a href="https://www.instagram.com/_ruh_al_oud._">
                  <Button variant="outline" size="icon">
                    <Instagram className="h-5 w-5" />
                  </Button>
                  </a>
                  
                  {/* <Button variant="outline" size="icon">
                    <Facebook className="h-5 w-5" />
                  </Button> */}
                </div>
              </div>
            </div>

            <div className="bg-card p-8 rounded-lg shadow-soft">
              <h3 className="font-display text-xl font-semibold mb-4">Send us a Message</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-2 rounded-md border border-input bg-background"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input 
                    type="email" 
                    className="w-full px-4 py-2 rounded-md border border-input bg-background"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <textarea 
                    rows={4}
                    className="w-full px-4 py-2 rounded-md border border-input bg-background"
                    placeholder="Your message..."
                  />
                </div>
                <Button type="submit" className="w-full">Send Message</Button>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
