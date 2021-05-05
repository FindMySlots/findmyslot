import { useEffect, useState, useCallback } from 'react';

interface Props {
  onEnd?: Function;
}

interface SpeakArguments {
  voice?: any,
  text: string,
  rate?: number,
  pitch?: number,
  volume?: number,
}

const useSpeechSynthesis = (props: Props) => {
  const { onEnd = () => {} } = props;
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [speaking, setSpeaking] = useState(false);
  const [supported, setSupported] = useState(false);

  const processVoices = useCallback((voiceOptions: SpeechSynthesisVoice[]) => {
    setVoices(voiceOptions);
  }, []);

  const getVoices = useCallback(() => {
    // Firefox seems to have voices upfront and never calls the
    // voiceschanged event
    let voiceOptions = window.speechSynthesis.getVoices();
    if (voiceOptions.length > 0) {
      processVoices(voiceOptions);
      return;
    }

    window.speechSynthesis.onvoiceschanged = (event: Event) => {
      // @ts-ignore
      // TODO: find TS way to solve this.
      voiceOptions = event?.target?.getVoices();
      processVoices(voiceOptions);
    };
  }, [processVoices]);

  const handleEnd = () => {
    setSpeaking(false);
    onEnd();
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      setSupported(true);
      getVoices();
    }
  }, [getVoices]);

  const speak = (args: SpeakArguments) => {
    const { voice = null, text = '', rate = 1, pitch = 1, volume = 1 } = args;
    if (!supported) return;
    setSpeaking(true);
    // Firefox won't repeat an utterance that has been
    // spoken, so we need to create a new instance each time
    const utterance = new window.SpeechSynthesisUtterance();
    utterance.text = text;
    utterance.voice = voice;
    utterance.onend = handleEnd;
    utterance.rate = rate;
    utterance.pitch = pitch;
    utterance.volume = volume;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  const cancel = () => {
    if (!supported) return;
    setSpeaking(false);
    window.speechSynthesis.cancel();
  };

  return {
    supported,
    speak,
    speaking,
    cancel,
    voices,
  };
};

export default useSpeechSynthesis;
