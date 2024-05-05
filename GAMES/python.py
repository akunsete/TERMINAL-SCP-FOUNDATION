import pygame
import sys

# Inisialisasi Pygame
pygame.init()

# Ukuran layar
SCREEN_WIDTH = 800
SCREEN_HEIGHT = 600

# Warna
WHITE = (255, 255, 255)
BLACK = (0, 0, 0)
RED = (255, 0, 0)

# Membuat layar
screen = pygame.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT))
pygame.display.set_caption("SCP Foundation Map")

# Main loop
def main():
    running = True
    while running:
        screen.fill(WHITE)
        draw_map()
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False
        pygame.display.flip()

    pygame.quit()
    sys.exit()

# Fungsi untuk menggambar peta
def draw_map():
    # Kode untuk menggambar peta di sini
    pass

if __name__ == "__main__":
    main()
