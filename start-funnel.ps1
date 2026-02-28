# Script to start Tailscale Funnel with persistent keep-alive loop
# Usage: Run this script in a separate PowerShell window or as a Scheduled Task.

Write-Host "Starting Tailscale Funnel for Port 5173..." -ForegroundColor Cyan

# Loop to ensure it restarts if it crashes or network resets
while ($true) {
    try {
        Write-Host "Launching Funnel..." -ForegroundColor Green
        # Assuming 'tailscale' is in your PATH. If not, use full path usually "C:\Program Files\Tailscale\tailscale.exe"
        tailscale funnel 5173
    }
    catch {
        Write-Host "Error occurred: $_" -ForegroundColor Red
    }
    
    Write-Host "Funnel process exited. Restarting in 10 seconds..." -ForegroundColor Yellow
    Start-Sleep -Seconds 10
}
