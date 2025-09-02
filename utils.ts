import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useEffect, useRef } from 'react';
import { Accelerometer } from 'expo-sensors';
import * as Haptics from 'expo-haptics';

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const useIOSShakeToUndo = (onShake: () => void) => {
  const accelerationHistory = useRef<number[]>([]);
  const lastShakeTime = useRef(0);

  useEffect(() => {
    let subscription: any;

    const startDetection = async () => {
      Accelerometer.setUpdateInterval(50); // 20Hz for smoother detection

      subscription = Accelerometer.addListener(({ x, y, z }) => {
        const acceleration = Math.sqrt(x * x + y * y + z * z);
        const currentTime = Date.now();

        // Keep a rolling window of accelerations
        accelerationHistory.current.push(acceleration);
        if (accelerationHistory.current.length > 10) {
          accelerationHistory.current.shift();
        }

        // Calculate variance to detect shake pattern
        const mean =
          accelerationHistory.current.reduce((a, b) => a + b, 0) /
          accelerationHistory.current.length;
        const variance =
          accelerationHistory.current.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) /
          accelerationHistory.current.length;

        // iOS-like detection: high variance indicates shaking
        const shakeVarianceThreshold = 0.5;
        const minimumPeakAcceleration = 1.8;
        const debounceTime = 1200; // iOS typically has ~1.2s debounce

        if (
          variance > shakeVarianceThreshold &&
          acceleration > minimumPeakAcceleration &&
          currentTime - lastShakeTime.current > debounceTime
        ) {
          lastShakeTime.current = currentTime;

          // iOS-style haptic feedback
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

          onShake();
        }
      });
    };

    startDetection();

    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, [onShake]);
};
