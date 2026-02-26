    # --- LOGIKA RUCHU (Sprawdzanie klawiszy) ---
    # keys = pygame.key.get_pressed()
    
    # if keys[pygame.K_LEFT] or keys[pygame.K_a]:
    #     x -= predkosc
    # if keys[pygame.K_RIGHT] or keys[pygame.K_d]:
    #     x += predkosc
    # if keys[pygame.K_UP] or keys[pygame.K_w]:
    #     y -= predkosc
    # if keys[pygame.K_DOWN] or keys[pygame.K_s]:
    #     y += predkosc
import pygame
import random

def ai_move():
    return random.choice(["Rock", "Paper", "Scissors"])

def update_score(score, player_move, ai_move):
    if cheat_sheet[player_move][ai_move] == 1:
        return (score[0] + 1, score[1]), "You win!"
    elif cheat_sheet[player_move][ai_move] == -1:
        return (score[0], score[1] + 1), "You lose!"
    else:
        return score, "It's a tie!"

cheat_sheet = {
    "": {"Rock": 0, "Paper": 0, "Scissors": 0},
    "Rock": {"Rock": 0, "Paper": -1, "Scissors": 1},
    "Paper": {"Rock": 1, "Paper": 0, "Scissors": -1},
    "Scissors": {"Rock": -1, "Paper": 1, "Scissors": 0}
}

pygame.init()
WIDTH, HEIGHT = 800, 600
screen = pygame.display.set_mode((WIDTH, HEIGHT))
clock = pygame.time.Clock()

# TWORZYMY CZCIONKĘ (raz, przed pętlą!)
hint_font = pygame.font.SysFont("Verdana", 15, bold=False)
player_file_font = pygame.font.SysFont("Verdana", 20, bold=False)
hand_font = pygame.font.SysFont("Verdana", 30, bold=True)

current_move_player = ""
current_ai_move = "Paper"
instructions = "Press CTRL for Rock, SHIFT for Paper, ENTER for Scissors"
result = "play to win or lose"

score = (0, 0)
game_counter = 0
check_score = True
running = True
while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    screen.fill((230, 230, 230))
    
    keys = pygame.key.get_just_released()
    pygame.key.set_repeat(200, 100)  # Ustawia powtarzanie klawiszy (delay, interval)
    if keys[pygame.K_LCTRL] or keys[pygame.K_RCTRL]:
        current_move_player = "Rock"
        current_ai_move = ai_move()
        score, result = update_score(score, current_move_player, current_ai_move)
        game_counter += 1
    if keys[pygame.K_LSHIFT] or keys[pygame.K_RSHIFT]:
        current_move_player = "Paper"
        current_ai_move = ai_move()
        score, result = update_score(score, current_move_player, current_ai_move)
        game_counter += 1
    if keys[pygame.K_RETURN]:
        current_move_player = "Scissors"
        current_ai_move = ai_move()
        score, result = update_score(score, current_move_player, current_ai_move)
        game_counter += 1

    # RENDEROWANIE TEKSTU (wewnątrz pętli, jeśli tekst się zmienia)
    text_surface = hint_font.render(instructions, True, (0, 0, 0))

    move_surface = hand_font.render(current_move_player, True, (0, 0, 0))
    player_title_surface = player_file_font.render("Your Move:", True, (0, 0, 0))

    ai_title_surface = player_file_font.render("AI Move:", True, (0, 0, 0))
    ai_move_surface = hand_font.render(current_ai_move, True, (0, 0, 0))
    
    score_surface = player_file_font.render(f"Score: {score[0]} - {score[1]}", True, (0, 0, 0))
    result_surface = player_file_font.render(result, True, (0, 0, 0))
    game_counter_surface = player_file_font.render(f"Games Played: {game_counter}", True, (0, 0, 0))

    result_rect = result_surface.get_rect(center=(WIDTH // 2, HEIGHT // 2))
    score_rect = score_surface.get_rect(center=(WIDTH // 2, HEIGHT // 4 * 3))
    game_counter_rect = game_counter_surface.get_rect(center=(WIDTH // 2, HEIGHT // 8 * 7))

    move_rect = move_surface.get_rect(center=(WIDTH // 2, HEIGHT // 3 * 2))
    player_rect = player_title_surface.get_rect(center=(WIDTH // 4, HEIGHT // 3 * 2))
    
    ai_rect = ai_title_surface.get_rect(center=(WIDTH // 4, HEIGHT // 3))
    ai_move_rect = ai_move_surface.get_rect(center=(WIDTH // 2, HEIGHT // 3))
    
    # WYŚWIETLANIE (Blit)
    # Nakładamy tekst w lewym górnym rogu (20, 20)
    screen.blit(text_surface, (20, 20))
    screen.blit(player_title_surface, player_rect)
    screen.blit(ai_title_surface, ai_rect)
    screen.blit(move_surface, move_rect)
    screen.blit(result_surface, result_rect)
    screen.blit(ai_move_surface, ai_move_rect)
    screen.blit(score_surface, score_rect)
    screen.blit(game_counter_surface, game_counter_rect)

    pygame.display.flip()
    clock.tick(60)

pygame.quit()