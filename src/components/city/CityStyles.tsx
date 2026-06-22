// Custom inline animations & styles compatibility for the city page
export default function CityStyles() {
  return (
    <style dangerouslySetInnerHTML={{ __html: `
      @keyframes float {
        0% { transform: translateY(0px); opacity: 0.3; }
        100% { transform: translateY(-20px); opacity: 0.8; }
      }
      .line-clamp-2 {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      .scrollbar-hide::-webkit-scrollbar {
        display: none;
      }
      .scrollbar-hide {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }
    `}} />
  );
}
