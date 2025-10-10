import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const About = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-8 animate-fade-in">About Ruh Al Oud</h1>
          
          <div className="prose prose-lg max-w-none space-y-6 animate-slide-up">
            <p className="text-lg leading-relaxed">
              Welcome to Ruh Al Oud, where luxury meets artistry in every bottle. We are passionate about creating 
              and curating exceptional fragrances that tell stories, evoke emotions, and celebrate individuality.
            </p>

            <h2 className="font-display text-3xl font-semibold mt-12 mb-4">Our Story</h2>
            <p className="leading-relaxed">
              Founded with a vision to bring the world's finest scents to discerning customers, Ruhaloud represents 
              more than just a perfume boutique. We are curators of olfactory experiences, dedicated to helping you 
              discover fragrances that resonate with your unique personality and style.
            </p>

            <h2 className="font-display text-3xl font-semibold mt-12 mb-4">Our Philosophy</h2>
            <p className="leading-relaxed">
              We believe that a signature scent is a powerful form of self-expression. Each fragrance in our collection 
              is carefully selected for its quality, uniqueness, and ability to create lasting impressions. Whether you're 
              seeking something bold and adventurous or soft and sophisticated, we have the perfect scent waiting for you.
            </p>

            <h2 className="font-display text-3xl font-semibold mt-12 mb-4">Quality & Craftsmanship</h2>
            <p className="leading-relaxed">
              Every product we offer meets our high standards for excellence. We partner with renowned perfumers and 
              houses that share our commitment to quality, ensuring that each fragrance delivers an unforgettable 
              experience from the first spray to the final dry-down.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
